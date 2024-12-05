---
title: "Remove sensitive data from ActivityWatch"
date: 2024-06-19 14:17:28+0200
description: "Delete unwanted data in bulk by querying the ActivityWatch SQLite database."
category: til
tags: linux
---

I've recently returned to tracking my activities with [ActivityWatch](https://github.com/ActivityWatch/activitywatch). It's still hard to [remove](https://docs.activitywatch.net/en/latest/uninstalling.html) or [filter](https://github.com/ActivityWatch/activitywatch/issues/1) sensitive data.

For bulk deletes operating directly on the SQLite database is the fastest.
1. Locate the `.db` file in the [data directories](https://docs.activitywatch.net/en/latest/directories.html).
2. Open the `.db` file in your favorite SQL editor (I use [Beekeeper Studio](https://github.com/beekeeper-studio/beekeeper-studio)).
3. Run the following query to remove sensitive data (use `SELECT` first instead of `DELETE` to check what data you will remove):

```sql
DELETE FROM eventmodel
WHERE datastr LIKE '%WHAT ACTVITY YOU WANT TO REMOVE%' COLLATE NOCASE;
```

