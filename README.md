# aoijs.mysql

aoijs.mysql makes it effortless to connect your aoi.js Discord bot to a MySQL database. Leveraging the power of mysql2, you get fast and reliable database operations, perfectly suited for any aoi.js bot project.</p>

---

## Installation

```bash
npm install aoijs.mysql
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
see [here](https://sidorares.github.io/node-mysql2/docs/examples/connections/create-pool#createpoolconfig) for more client options

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

**Cooldown functions**
```bash
$mysqlAdvanceCooldown
$mysqlChannelCooldown
$mysqlCooldown
$mysqlGetCooldownTime
$mysqlGlobalCooldown
$mysqlGuildCooldown
```

**Leaderboard functions**
```bash
$mysqlGetLeaderboardInfo
$mysqlGlobalUserLeaderBoard
$mysqlGuildLeaderBoard
$mysqlRawLeaderboard
$mysqlUserLeaderBoard
```

**Variable functions**
```bash
$mysqlCreateTemporaryVar
$mysqlDeleteVar
$mysqlGetChannelVar
$mysqlGetGlobalUserVar
$mysqlGetGuildVar
$mysqlGetMessageVar
$mysqlGetUserVar
$mysqlGetVar
$mysqlIsVariableExist
$mysqlResetGlobalUserVar
$mysqlResetGuildVar
$mysqlResetUserVar
$mysqlSetChannelVar
$mysqlSetGlobalUserVar
$mysqlSetGuildVar
$mysqlSetMessageVar
$mysqlSetUserVar
$mysqlSetVar
```

**Other functions**
```bash
$mysqlCloseTicket
$mysqlDatabasePing
$mysqlGetTimeout
$mysqlIsTicket
$mysqlNewTicket
$mysqlStopTimeout
$mysqlTimeoutList
```
</details>

---

## Migrating

If you have an existing aoi.db database, you can back it up or transfer its data to aoijs.mysql. Ensure that your setup is properly configured:

```javascript
new Database(client, {
    . . .
    backup: {
        enable: true,             // Enable database transfer
        directory: './database',  // Directory where your aoi.db data is located
    }
});
```
---
