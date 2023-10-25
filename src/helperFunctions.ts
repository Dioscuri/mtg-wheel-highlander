import { CardData } from "./types";
export function getCardData(apiObject:any):CardData{
    return {
        id: apiObject.oracle_id,
        scryfall_id: apiObject.id,
        uri: apiObject.uri,
        cmc:apiObject.cmc,
        colors:apiObject.colors,
        name: apiObject.name,
        type_line: apiObject.type_line,
        image_uris: apiObject.image_uris
    }
    
}