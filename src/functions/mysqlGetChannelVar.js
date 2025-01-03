"use strict";
module.exports = async (d) => {
    const data = d.util.aoiFunc(d);
    if (data.err)
        return d.error(data.err);
    let [varname, channelID = d.channel?.id, table = d.client.mysql.tables[0]] = data.inside.splits;
    varname = varname?.addBrackets();
    if (!d.client.variableManager.has(varname, table))
        return d.aoiError.fnError(d, 'custom', {}, `Variable "${varname}" Not Found`);
    data.result = (await d.client.mysql.get(table, varname, channelID))?.value ?? d.client.variableManager.get(varname, table)?.default;
    data.result = typeof data.result === 'object' ? JSON.stringify(data.result) : data.result;
    return {
        code: d.util.setCode(data)
    };
};
