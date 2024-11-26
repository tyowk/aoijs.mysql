> [!note]
> **I made this package only for personal use, but you can still install this package if you want to use it.**

---

# aoijs.mysql

aoijs.mysql makes it effortless to connect your aoi.js Discord bot to a MySQL database. Leveraging the power of mysql2, you get fast and reliable database operations, perfectly suited for any aoi.js bot project.</p>

---

## Installation

```bash
npm i github:tyowk/aoijs.mysql#main
```

---

## Setup

```javascript
const { AoiClient } = require('aoi.js');
const { Database } = require('aoijs.mysql');  // Import the aoijs.mysql package

const client = new AoiClient({ ... });

new Database(client, {
    url: 'mysql://your_database_url...',      // Replace with your MySQL server URI
    tables: ['main'],                         // Specify your database tables                              # default is main
    keepAoiDB: false,                         // Set to true to use both aoi.db and MySQL                  # default is false
    debug: false                              // Set to true for debug information during development      # default is false
});
```

---

## Keep aoi.db

If you have an existing aoi.db database, you can continue to use it alongside aoijs.mysql. Just ensure that your setup is correctly configured:

```javascript
const client = new AoiClient({
    . . .
    database: { ... },           // Your Aoi.DB options
    disableAoiDB: false          // Must be false to use both databases
});

new Database(client, {
    . . .
    keepAoiDB: true              // This should be set to true
});
```

---

<details>
<summary>
  
## Functions
</summary>

These 36 custom functions works like a normal existing functions *( only the name and inside the functions are different )* 

And these functions can only work if you set `keepAoiDB` to true<br><br>
```
$mysqlAdvanceCooldown
$mysqlChannelCooldown
$mysqlCloseTicket
$mysqlCooldown
$mysqlCreateTemporaryVar
$mysqlDatabasePing
$mysqlDeleteVar
$mysqlGetChannelVar
$mysqlGetCooldownTime
$mysqlGetGlobalUserVar
$mysqlGetGuildVar
$mysqlGetLeaderboardInfo
$mysqlGetMessageVar
$mysqlGetTimeout
$mysqlGetUserVar
$mysqlGetVar
$mysqlGlobalCooldown
$mysqlGlobalUserLeaderBoard
$mysqlGuildCooldown
$mysqlGuildLeaderBoard
$mysqlIsTicket
$mysqlIsVariableExist
$mysqlNewTicket
$mysqlRawLeaderboard
$mysqlResetGlobalUserVar
$mysqlResetGuildVar
$mysqlResetUserVar
$mysqlSetChannelVar
$mysqlSetGlobalUserVar
$mysqlSetGuildVar
$mysqlSetMessageVar
$mysqlSetUserVar
$mysqlSetVar
$mysqlStopTimeout
$mysqlTimeoutList
$mysqlUserLeaderBoard
```
</details>

---

## Migrating

If you're considering transferring your aoi.db database to MySQL, **🚫 Migration Is Not Currently Possible!**

---

<div align="center">
<br>
<br>
<br>
<br>
<br>
<br>
<img src="https://aoi.js.org/_astro/icon_new.C4KTn9Lv_Z232q1W.webp" width="100">
<br>
<a href="https://aoi.js.org/invite">
<img src="https://img.shields.io/discord/773352845738115102?logo=discord&logoColor=white&color=3182b0&style=for-the-badge">
</a>
</div>
