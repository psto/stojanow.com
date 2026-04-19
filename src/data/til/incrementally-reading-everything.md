---
title: "Incrementally Reading Everything"
date: 2026-04-19 23:26:47+0200
description: "How I use a custom script to read and write incrementally with spaced repetition."
category: til
tags: scripts
---

I have recently created an [incremental reading](https://en.wikipedia.org/wiki/Incremental_reading) and [incremental writing](https://supermemo.guru/wiki/Incremental_writing) script that lets me read PDF documents alongside my Markdown files with [spaced repetition](https://en.wikipedia.org/wiki/Spaced_repetition).

Previously, I used [incremental-writing plugin](https://github.com/bjsi/incremental-writing) for [Obsidian](https://obsidian.md/), but it was abandoned, and I dislike reading PDFs in Obsidian. I can now add files to queues from outside of Obsidian. Moreover, I get to sync and import notes automatically with [zk](https://github.com/zk-org/zk) and from [sioyek](https://github.com/ahrm/sioyek)'s highlights (via my [irw-extract-sioyek script](https://github.com/psto/.dotfiles/blob/main/scripts/.local/bin/irw-extract-sioyek)).

The review workflow is frictionless.
1. With the help of my [niri-focus-or-launch](https://github.com/psto/.dotfiles/blob/main/scripts/.local/bin/niri-focus-or-launch) and [irw-scratchpad](https://github.com/psto/.dotfiles/blob/main/scripts/.local/bin/irw-scratchpad) scripts I press `Mod+I` to launch `irw`. In niri's `config.kdl` I have the keybinding:
```
binds {
  Mod+I { spawn "~/.local/bin/niri-focus-or-launch" "irw-scratchpad" "ir_monitor"; }
}
```

and window rule to have the `irw` menu floating in the top right corner:

```
window-rule {
  match app-id="ir_monitor"
  open-floating true
  default-floating-position x=0 y=0 relative-to="top-right"
  default-column-width { fixed 800; }
  default-window-height { fixed 100; }
}
```

2. `irw` uses my `launch` script to open the resource in its predetermined program and focuses the window.
3. After reading or writing I press `Mod+I` again to focus the script's window and chose what to do from the menu by pressing: `Enter` for next, `p` to change priority, `f` to mark as finish, `s` to skip, `z` to postpone 1 week or `q` to quit.

Now I'm just two key presses away from jumping back to my reading queue. It had a huge impact on trimming down my reading list.

Since I'm interested in learning Go and the performance of open-weights models, I [rewrote the script in Go](https://github.com/psto/irw) with `GLM-5` and `MiniMax-M2.7`. Given that the original API and logic were already created, the models were up to the task. I've even added more features like an external `config` file, compact menu, CLI mode and better time tracking.

Even though I'm using the [Go version of irw](https://github.com/psto/irw), I'm leaving the [original script](https://github.com/psto/.dotfiles/blob/main/scripts/.local/bin/ir.sh) here for posterity:

```bash
#!/bin/bash

DB_DIR="$HOME/.local/share/ir-tool/"
DB_PATH="$DB_DIR/ir.db"
SIOYEK_SHARED_DB="$HOME/.local/share/sioyek/shared.db"
SIOYEK_LOCAL_DB="$HOME/.local/share/sioyek/local.db"

# Initialize Database
mkdir -p "$DB_DIR"
sqlite3 "$DB_PATH" "PRAGMA journal_mode=WAL;" > /dev/null 2>&1
sqlite3 "$DB_PATH" "CREATE TABLE IF NOT EXISTS tracks (
    path TEXT PRIMARY KEY,
    type TEXT DEFAULT 'reading',
    interval REAL DEFAULT 1.0,
    afactor REAL DEFAULT 2.0,
    due_date INTEGER DEFAULT (strftime('%s', 'now')),
    is_finished INTEGER DEFAULT 0,
    priority REAL DEFAULT (ABS(random() % 21) + 40),
I);"
sqlite3 "$DB_PATH" "CREATE TABLE IF NOT EXISTS sessions (
    date TEXT DEFAULT (date('now', 'localtime')),
    duration INTEGER,
    reviewed INTEGER,
    finished INTEGER
);"

track_file() {
    local input="$1"
    local safe_path="${input//\'/\'\'}"

    # URI Handler
    if [[ "$input" =~ ^(https?|zotero)://]]; then
        sqlite3 "$DB_PATH" "INSERT OR IGNORE INTO tracks (path) VALUES ('$safe_path');"
        echo "Tracked URI: $input"
        return 0
    fi

    # File Handler
    [ ! -f "$input" ] && echo "Error: File not found!" && return 1
    local abs_path=$(realpath "$input")
    local safe_abs="${abs_path//\'/\'\'}"
    local yaml_priority=""

    # ONLY run zk for markdown files
    if [[ "$abs_path" == *.md ]]; then
        yaml_priority=$(zk list "$abs_path" --format json 2>/dev/null | jq -r '.[0].metadata.priority // empty')
    fi

    if [[ "$yaml_priority" =~ ^[0-9]+$ ]]; then
        sqlite3 "$DB_PATH" "INSERT OR IGNORE INTO tracks (path, priority) VALUES ('$safe_abs', $yaml_priority);"
        echo "Tracked (MD Priority $yaml_priority): $(basename "$abs_path")"
    else
        sqlite3 "$DB_PATH" "INSERT OR IGNORE INTO tracks (path) VALUES ('$safe_abs');"
        echo "Tracked: $(basename "$abs_path")"
    fi
}

untrack_file() {
    local target="$1"
    [ -z "$target" ] && target=$(sqlite3 "$DB_PATH" "SELECT path FROM tracks;" | fzf --height 40% --reverse --header="Select to UNTRACK")
    [ -z "$target" ] && return

    local safe_target="${target//\'/\'\'}"
    sqlite3 "$DB_PATH" "DELETE FROM tracks WHERE path = '$safe_target';"
    echo "Untracked: $target"
}

complete_file() {
    local target="$1"
    [ -z "$target" ] && target=$(sqlite3 "$DB_PATH" "SELECT path FROM tracks WHERE is_finished = 0;" | fzf --height 40% --reverse --header="Select to complete")
    [ -z "$target" ] && return

    local safe_target="${target//\'/\'\'}"
    sqlite3 "$DB_PATH" "UPDATE tracks SET is_finished=1 WHERE path='$safe_target';"
    echo "Completed: $target"
}

set_priority() {
    local target="$1"
    local new_priority="$2"

    [ -z "$target" ] && target=$(sqlite3 "$DB_PATH" "SELECT path FROM tracks WHERE is_finished = 0;" | fzf --height 40% --reverse --header="Set priority")
    [ -z "$target" ] && return
    [ -z "$new_priority" ] && read -p "Priority (0-100) for $target: " new_priority

    local safe_target="${target//\'/\'\'}"
    sqlite3 "$DB_PATH" "UPDATE tracks SET priority=$new_priority WHERE path='$safe_target';"
    echo "Priority $new_priority set for $target"
}

show_stats() {
    local TYPE="${1:-reading}"
    # Capitalize first letter for header
    echo "## 📊 ${TYPE^} queue" | glow -

    sqlite3 -column -header "$DB_PATH" "
        SELECT
            COUNT(*) FILTER (WHERE is_finished = 0) AS 'Active',
            COUNT(*) FILTER (WHERE is_finished = 1) AS 'Finished',
            COUNT(*) FILTER (WHERE is_finished = 0 AND due_date <= strftime('%s', 'now')) AS 'Due',
            printf('%.1f%%', (CAST(COUNT(*) FILTER (WHERE is_finished = 1) AS REAL) / NULLIF(COUNT(*), 0) * 100)) AS 'Completion'
        FROM tracks
        WHERE type = '$TYPE';"

    echo "## 📅 Daily Review Activity (All)" | glow -
    sqlite3 -box "$DB_PATH" "
        SELECT
            date AS 'Date',
            printf('%02d:%02d:%02d', SUM(duration)/3600, (SUM(duration)%3600)/60, SUM(duration)%60) AS 'Time',
            SUM(reviewed) AS 'Items',
            SUM(finished) AS 'Fin',
            printf('%.2fm', (CAST(SUM(duration) AS REAL) / NULLIF(SUM(reviewed), 0)) / 60.0) AS 'Avg/Item'
        FROM sessions
        GROUP BY date
        ORDER BY date DESC
        LIMIT 7;"
}

show_schedule() {
    sqlite3 -box "$DB_PATH" "
        SELECT
            datetime(due_date, 'unixepoch', 'localtime') AS 'Due',
            printf('%.1f', interval) AS 'Int',
            printf('%.1f', afactor) AS 'AF',
            priority AS 'Priority',
            type AS 'Type',
            replace(path, '$HOME', '~') AS 'File'
        FROM tracks WHERE is_finished = 0 ORDER BY due_date ASC;"
}

read_file() {
    local SELECTED
    SELECTED=$(sqlite3 "$DB_PATH" "SELECT path FROM tracks WHERE is_finished = 0 AND type='reading' ORDER BY due_date ASC;" | \
               fzf --height 40% --reverse --border --header="Select file to jump into")

    if [ -n "$SELECTED" ]; then
        "$HOME/.local/bin/launch" "$SELECTED"
        echo "Read: $(basename "$SELECTED")"
    else
        echo "Selection cancelled."
    fi
}

write_file() {
    local SELECTED
    SELECTED=$(sqlite3 "$DB_PATH" "SELECT path FROM tracks WHERE is_finished = 0 AND type='writing' ORDER BY due_date ASC;" | \
               fzf --height 40% --reverse --border --header="Select file to jump into")

    if [ -n "$SELECTED" ]; then
        "$HOME/.local/bin/launch" "$SELECTED"
        echo "write: $(basename "$SELECTED")"
    else
        echo "Selection cancelled."
    fi
}

import_from_zk() {
    for tag in "reading" "writing"; do
        echo "Importing status/$tag..."
        zk list --tag "status/$tag" --format json | jq -c '.[]' | while read -r note_json; do
            local note_path=$(echo "$note_json" | jq -r '.absPath')
            local priority=$(echo "$note_json" | jq -r '.metadata.priority // empty')
            local safe_path="${note_path//\'/\'\'}"

            # Insert with correct type
            sqlite3 "$DB_PATH" "INSERT OR IGNORE INTO tracks (path, type) VALUES ('$safe_path', '$tag');"
            # Update priority if YAML changed
            [[ "$priority" =~ ^[0-9]+$ ]] && sqlite3 "$DB_PATH" "UPDATE tracks SET priority=$priority WHERE path='$safe_path';"
        done
    done

    echo "Checking for dead links..."
    sqlite3 "$DB_PATH" "SELECT path FROM tracks;" | while read -r stored_path; do
        [ -z "$stored_path" ] && continue

        # SKIP deletion if entry is a URI (http/https/zotero)
        [[ "$stored_path" =~ ^(https?|zotero)://]] && continue

        if [ ! -f "$stored_path" ]; then
            echo "🗑️  Removing dead file: $stored_path"
            local safe_path="${stored_path//\'/\'\'}"
            sqlite3 "$DB_PATH" "DELETE FROM tracks WHERE path = '$safe_path';"
        fi
    done
}

import_from_sioyek() {
    echo "Syncing highlighted files from Sioyek to tracker..."

    # 1. Get paths of all documents that have highlights created in the last 24h
    local SQL="SELECT DISTINCT document_path FROM highlights WHERE creation_time > datetime('now', '-1 day');"

    # 2. Process each path
    sqlite3 -separator '|' "$SIOYEK_SHARED_DB" "$SQL" | while read -r DOC_PATH; do
        [ -z "$DOC_PATH" ] && continue

        # --- PATH RESOLUTION ---
        local REAL_PATH="$DOC_PATH"
        # If the path is a hash (no slashes), look up the real path in local_db
        if [[ "$DOC_PATH" != *"/"* ]]; then
            REAL_PATH=$(sqlite3 "$SIOYEK_LOCAL_DB" "SELECT path FROM document_hash WHERE hash='$DOC_PATH' LIMIT 1;")
        fi

        # 3. Add to the IR database if it's a valid file
        if [ -f "$REAL_PATH" ]; then
            local safe_p="${REAL_PATH//\'/\'\'}"

            # Check if it's already tracked to avoid unnecessary output
            local EXISTS=$(sqlite3 "$DB_PATH" "SELECT 1 FROM tracks WHERE path='$safe_p';")

            if [ -z "$EXISTS" ]; then
                sqlite3 "$DB_PATH" "INSERT OR IGNORE INTO tracks (path) VALUES ('$safe_p');"
                echo "Added to tracker from Sioyek highlights: $(basename "$REAL_PATH")"
            fi
        fi
    done
}

purge_finished() {
    local count=$(sqlite3 "$DB_PATH" "SELECT COUNT(*) FROM tracks WHERE is_finished = 1;")
    echo "Found $count finished items."
    read -p "Delete them from database? [y/N] " resp
    if [[ "$resp" == "y" ]]; then
        sqlite3 "$DB_PATH" "DELETE FROM tracks WHERE is_finished = 1;"
        echo "Purged."
    fi
}

run_maintenance() {
    import_from_sioyek
    import_from_zk
}

review_session() {
    local TYPE="${1:-reading}" # Default to reading if no arg
    local EXT="$2"
    local FILTER="AND type='$TYPE'"

    [ -n "$EXT" ] && FILTER="$FILTER AND path LIKE '%.${EXT}'"

    # --- SESSION TRACKERS ---
    local S_START=$(date +%s)
    local S_COUNT=0
    local S_FIN=0

    while true; do
        DATA=$(sqlite3 "$DB_PATH" "SELECT path, interval, afactor FROM tracks WHERE due_date <= strftime('%s', 'now') AND is_finished = 0 $FILTER ORDER BY (ABS(random() % 20) = 0) DESC, priority ASC, due_date ASC LIMIT 1;")

        if [ -z "$DATA" ]; then
            clear
            echo "# 🎉 Queue Empty!" | glow -
            break
        fi

        IFS='|' read -r FILE_PATH INT AF <<< "$DATA"

        local FILENAME=$(basename "$FILE_PATH")

        # Render UI with Glow
        clear
        cat << EOF | glow -s dark
📖 **$FILENAME**
* **[Enter]** Next Interval
* **[p]** Set Priority
* **[f]** Finish File
* **[s]** Skip
* **[q]** Quit
* **[z]** Zzz Postpone

EOF

        "$HOME/.local/bin/launch" "$FILE_PATH"

        # Silent Instant Keypress (no Enter required)
        # -s: silent, -n 1: one character only
        read -r -s -n 1 C

        case $C in
            p)
               echo -e "\n"
               read -r -p "New Priority (0-100): " NP
               sqlite3 "$DB_PATH" "UPDATE tracks SET priority=$NP WHERE path='$FILE_PATH'"
               ;;
            f)
               sqlite3 "$DB_PATH" "UPDATE tracks SET is_finished=1 WHERE path='$FILE_PATH'"
               ((S_FIN++))
               ((S_COUNT++))
               echo -e "\nMarked as finished."
               sleep 0.5
               ;;
            s)
               sqlite3 "$DB_PATH" "UPDATE tracks SET due_date=$(($(date +%s)+3600)) WHERE path='$FILE_PATH'"
               echo -e "\nSkipped for 1 hour."
               sleep 0.5
               ;;
            q)
               echo -e "\nQuitting..."
               break
               ;;
            z) # Zzz Postpone (no interval increase) use 604800 for 1 week
               sqlite3 "$DB_PATH" "UPDATE tracks SET due_date=$(($(date +%s)+86400)) WHERE path='$FILE_PATH'"
               echo -e "\nPostponed to tomorrow."
               sleep 0.3 ;;
            "") # This captures the "Enter" key (empty string)
               NEW_DUE=$(echo "$(date +%s) + ($INT * 86400)" | bc | cut -d. -f1)
               NEW_INT=$(echo "$INT * $AF" | bc)
               sqlite3 "$DB_PATH" "UPDATE tracks SET interval=$NEW_INT, due_date=$NEW_DUE WHERE path='$FILE_PATH'"
               echo -e "\nRescheduled."
               sleep 0.3
               ;;
            *)
               # Optional: handle invalid keys
               ;;
        esac
    done

    local S_END=$(date +%s)
    local DUR=$((S_END - S_START))
    # Log stats to db
    sqlite3 "$DB_PATH" "INSERT INTO sessions (duration, reviewed, finished) VALUES ($DUR, $S_COUNT, $S_FIN);"

    run_maintenance
    echo
    show_stats "$TYPE"
}

show_help() {
    cat << EOF
Usage: ir <command> [argument]

Core Commands:
  review [ext]    Start a session (optional: filter by extension like 'pdf')
  read [ext]      Pick a specific file to read
  track <file>    Add a new file to the tracker
  untrack [file]  Remove a file from the tracker
  complete [file] Mark a file as finished

Management:
  priority [file] [p] Set priority (0-100) for a file
  schedule            Show upcoming due dates and priorities
  stats               Show completion progress
  import              Sync files from zk and sioyek
  purge               Delete finished files from db

Examples:
  ir review pdf  # Review only PDF files
  ir read        # Browse all active files
EOF
}

get_target_path() {
    local t="$1"
    [[ "$t" =~ ^(https?|zotero)://]] && echo "$t" || realpath "$t" 2>/dev/null
}

# --- CLI Router ---
if [ -n "$2" ]; then
    TARGET_PATH=$(get_target_path "$2")
fi

case "$1" in
    track)        track_file "$TARGET_PATH" ;;
    untrack)      untrack_file "$TARGET_PATH" ;;
    complete)     complete_file "$TARGET_PATH" ;;
    priority)     set_priority "$TARGET_PATH" "$3" ;;
    stats)        show_stats "$2" ;;
    schedule)     show_schedule ;;
    review)       review_session "$2" "$3" ;;
    import)       run_maintenance ;;
    read)         read_file ;;
    write)        write_file ;;
    purge)        purge_finished ;;
    *) show_help ;;
esac
```
