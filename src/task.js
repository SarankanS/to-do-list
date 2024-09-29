
export default class Tasks{
    constructor(name, date = 'no due date', description = ''){
        this.name = name;
        this.date = date;
        this.description = description;
        
    }
    // set name
    setName(name) {
        this.name = name;
        
    }
    // get name
    getName (){
        return this.name;
    }

    //set due date
    setDueDate(date){
        this.date = date; 
    }
    // get date
    getDueDate(){
        return this.date;
    }

    setDescription(description){
        this.description = description;
    }

    getDescription(){
        return this.description;
    }

    //get date formatted
    getFormattedDate(){
        const day = this.date.split('/')[2];
        const month = this.date.split('/')[1];
        const year = this.date.split('/')[0];
        return `${month}/${day}/${year}`;
    }

}