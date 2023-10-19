// Type Declaration for the Card Object
// Needs the fields necessary to store the data needed to display 
// And organize properly
type CardData = {
    id:string,
    uri:string,
    
    cmc:number,
    colors:Array<string>,
    name:string,
    power?:string, // Applies only to creatures
    toughness?:string, // Applies only to creatures
    type_line:string,
    image_uris:Object
}

// Props so that we can access the object without listing all fields 
// In the child component
type CardDataProps = {
    card_data:CardData
}
export {CardData, CardDataProps}