module.exports = async (d: any) => {
    const data = d.util.aoiFunc(d);
    if (data.err) return d.error(data.err);
    const [variable, type = "asc", custom = `{top}. {username}: {value}`, list = 10, page = 1, table = d.client.mysql.tables[0], hideNegativeValue = false, hideZeroValue = false] = data.inside.splits;
    if (!d.client.variableManager.has(variable, table)) return d.aoiError.fnError(d, "custom", {}, `Variable "${variable}" Not Found`);
    if (!type || (type.toLowerCase() !== "asc" && type.toLowerCase() !== "desc")) return d.aoiError.fnError(d, "custom", {}, `Invalid type must be "desc" or "asc"`);
    const result = [];
    let db = await d.client.mysql.all(
        table,
        (data: any) => {
            return data.key.startsWith(variable?.addBrackets() + "_") && data.key.split("_").length === 2;
        },
        list * page,
        type
    );

    let i = 1;
    for (const lbdata of db) {
        const key = lbdata?.key.split("_")[1];
        const user = await d.util.getUser(d, key);

        if (!user) continue;

        if (hideNegativeValue === "true" && parseInt(lbdata?.value) < 0) continue;
        if (hideZeroValue === "true" && parseInt(lbdata?.value) == 0) continue;

        interface Replacer {
            "{value}"?: number;
            "{top}": number;
            "{username}": string;
            "{displayName}": string;
            "{tag}": string;
            "{id}": string;
            "{mention}": string;
        }
        
        const replacer: Replacer = {
            "{value}": parseInt(lbdata?.value),
            "{top}": i,
            "{username}": user.username,
            "{displayName}": user?.displayName,
            "{tag}": user?.tag,
            "{id}": user.id,
            "{mention}": user
        };

        let text = custom;
        if (text.includes("{value:")) {
            let sep = text.split("{value:")[1].split("}")[0];
            text = text.replaceAll(`{value:${sep}}`, parseInt(lbdata?.value).toLocaleString().replaceAll(",", sep));
        }

        for (const key in replacer) {
            text = text.replace(new RegExp(key, "g"), replacer[key as keyof Replacer]);;
        }

        result.push(text);
        i++;
    }

    data.result = result.slice(page * list - list, page * list).join("\n");

    return {
        code: d.util.setCode(data)
    };
};