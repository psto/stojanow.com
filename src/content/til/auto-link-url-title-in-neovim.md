---
title: "Auto link URL title in Neovim"
date: 2024-10-22 14:31:59+0200
description: "Fetch an URL title as markdown link on paste using a lua function in Neovim."
category: til
tags: neovim
---

I'm migrating my note-taking from [Obsidian](https://obsidian.md/) to [Neovim](https://neovim.io/) ([my config](https://github.com/psto/.dotfiles/tree/main/nvim/.config/nvim)). But there are still some plugins I miss having. One of them is [Obsidian Auto Link Title](https://github.com/zolrath/obsidian-auto-link-title/) which fetches the titles of pasted links.

I wrote a small `lua` function that does the same thing:

```lua
-- ~/.config/nvim/lua/util/functions.lua
function M.get_url_title()
  -- grap url from cliboard
  local url = vim.fn.getreg "+"

  -- use curl to fetch url
  local handle = io.popen("curl -s " .. url)
  if not handle then return end
  local result = handle:read("*a")
  handle:close()

  -- grab text between <title></title> tag from result BUT don't include the <title></title>
  local title = result:match("<title>(.-)</title>")

  local markdown_url = "[" .. title .. "](" .. url .. ")"

  -- write markdown_url into current file
  vim.api.nvim_put({ markdown_url }, "l", false, true)
end

return M
```

Set a keymap for pasting the URL:

```lua
-- ~/.config/nvim/lua/config/keymaps.lua
vim.keymap.set("n", "<leader>su", "<cmd>lua require('util/functions').get_url_title()<CR>", { noremap = true, silent = true })
```
