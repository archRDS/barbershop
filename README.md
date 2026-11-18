# ATLANT на GitHub Pages

Это готовая статическая версия сайта для демонстрации проекта. Сборка на GitHub не требуется.

1. Создайте пустой публичный репозиторий на GitHub.
2. Загрузите **содержимое** этой папки в его корень. Файлы `index.html` и `.nojekyll` должны лежать рядом с папкой `assets`, непосредственно в репозитории.
3. Откройте **Settings → Pages**. В поле **Source** выберите **Deploy from a branch**, затем ветку **main**, папку **/ (root)** и нажмите **Save**.
4. После завершения публикации адрес появится в **Settings → Pages**. Для обычного проектного репозитория он выглядит как `https://ИМЯ-ПОЛЬЗОВАТЕЛЯ.github.io/ИМЯ-РЕПОЗИТОРИЯ/`.

В этой версии секция записи ведёт на телефон и Telegram. Серверное бронирование, SQLite, уведомления бота и кабинет мастера доступны в серверной версии ATLANT.

Для обновления пакета из исходного проекта выполните в его корне `pnpm build`, затем `node scripts/prepare-github-pages.mjs` и перенесите обновлённое содержимое этой папки в репозиторий GitHub Pages.

- [Как настроить GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Ограничения GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)
