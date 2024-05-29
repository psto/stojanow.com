---
title: "Filter Gmail Messages Shortcut"
date: 2024-05-29 22:18:51+0200
description: "Filter emails in Gmail with a userscript keyboard shorcut."
category: til
tags: email
---

I have a Gmail account only for subscribing to newsletters, blogs and substacks. Often, I find myself selecting one or more emails and filtering them for an impromptu reading list. Not only does it save me from switching reading contexts, but it is also a great way to archive/delete multiple emails at once. Labels alone can't solve this use case.

There is no keyboard shortcut to do this. You can press `.` (period) for the dropdown "More" menu, navigate up/down a few times with cursor keys and select "Filter messages like these" with `Enter`.

Since I mainly use the keyboard to navigate in Gmail and want to save myself a few clicks, I created the following [userscript](https://greasyfork.org/en/scripts/496468-filter-gmail-shortcut) ([GitHub](https://github.com/psto/userscript-filter-gmail-shortcut)) to add a shortcut ("alt+g") for the above workflow.

```javascript
(function() {
  'use strict'

  function handleKeyPress(event) {
    if (event.altKey && event.code === 'KeyG') {
      const main = document.querySelector('div[role=main]');
      const emailElements = main.querySelectorAll('tr')

      const selectedEmailRows = Array.from(emailElements).filter((row) => {
        const tdElements = row.querySelectorAll('td');

        const hasAriaChecked = Array.from(tdElements).some((td) => {
          const isChecked = td.querySelector('div[aria-checked]')

          if (isChecked) {
            return isChecked.getAttribute('aria-checked') === 'true'
          }
        });

        const hasEmailSpan = row.querySelector('span[email]');

        return hasAriaChecked && hasEmailSpan;
      });

      let emails = []

      selectedEmailRows.filter((emailRow) => {
        const emailElement = emailRow.querySelector('td span[email]')
        const emailAddress = emailElement.getAttribute('email');
        emails.push(encodeURIComponent(emailAddress))
      })

      const searchUrl = `https://mail.google.com/mail/u/0/#search/from:(${emails.join(' OR ')})`;

      window.location.href = searchUrl;
    }
  }

  document.addEventListener('keydown', handleKeyPress);
})();
```

If you prefer a bookmarklet just drag and drop the following button to your bookmark bar:

<div class="flex justify-center">
  <a class="no-underline flex transform items-center space-x-1 rounded-md border border-brand-red bg-white px-4 py-2 text-lg font-medium leading-6 text-brand-red transition duration-300 hover:bg-brand-red hover:text-white hover:brightness-125 dark:border-brand-red-dark dark:bg-dark dark:text-brand-red-dark dark:hover:bg-brand-red-dark dark:hover:text-black md:px-8 md:py-4 md:text-xl" href="javascript:(function()%7B(function()%20%7B%0A%20%20const%20main%20%3D%20document.querySelector('div%5Brole%3Dmain%5D')%3B%0A%20%20const%20emailElements%20%3D%20main.querySelectorAll('tr')%0A%0A%20%20const%20selectedEmailRows%20%3D%20Array.from(emailElements).filter((row)%20%3D%3E%20%7B%0A%20%20%20%20const%20tdElements%20%3D%20row.querySelectorAll('td')%3B%0A%0A%20%20%20%20const%20hasAriaChecked%20%3D%20Array.from(tdElements).some((td)%20%3D%3E%20%7B%0A%20%20%20%20%20%20const%20isChecked%20%3D%20td.querySelector('div%5Baria-checked%5D')%0A%0A%20%20%20%20%20%20if%20(isChecked)%20%7B%0A%20%20%20%20%20%20%20%20return%20isChecked.getAttribute('aria-checked')%20%3D%3D%3D%20'true'%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D)%3B%0A%0A%20%20%20%20const%20hasEmailSpan%20%3D%20row.querySelector('span%5Bemail%5D')%3B%0A%0A%20%20%20%20return%20hasAriaChecked%20%26%26%20hasEmailSpan%3B%0A%20%20%7D)%3B%0A%0A%20%20let%20searchTerm%20%3D%20''%3B%0A%20%20let%20searchUrl%20%3D%20'https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F%23search%2F'%3B%0A%20%20let%20emails%20%3D%20%5B%5D%0A%0A%20%20const%20selectedEmails%20%3D%20selectedEmailRows.filter((emailRow)%20%3D%3E%20%7B%0A%20%20%20%20const%20emailElement%20%3D%20emailRow.querySelector('td%20span%5Bemail%5D')%0A%20%20%20%20const%20emailAddress%20%3D%20emailElement.getAttribute('email')%3B%0A%20%20%20%20emails.push(encodeURIComponent(emailAddress))%0A%20%20%7D)%0A%0A%20%20searchUrl%20%2B%3D%20%60from%3A(%24%7Bemails.join('%20OR%20')%7D)%60%3B%0A%0A%20%20window.location.href%20%3D%20searchUrl%3B%0A%7D)()%3B%7D)()%3B">filter Gmail</a>
</div>

Select the emails you want to filter and click the bookmarklet (or set a keyword for it and run it from the address bar).
