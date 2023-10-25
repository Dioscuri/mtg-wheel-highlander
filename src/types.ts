// Type Declaration for the Card Object
// Needs the fields necessary to store the data needed to display 
// And organize properly
type CardData = {
    id:string,
    scryfall_id:string,
    uri:string,
    
    cmc:number,
    colors:Array<string>,
    name:string,
    power?:string, // Applies only to creatures
    toughness?:string, // Applies only to creatures
    type_line:string,
    image_uris:Object
}

type DeckData = {
    id:string, 
    cards:Map<string, CardData>
}
// Props so that we can access the object without listing all fields 
// In the child component
type CardProps = {
    card_data:CardData
}
export {CardData, CardProps, DeckData}