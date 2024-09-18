
export default class Tasks{
    constructor(name, date = 'no due date'){
        this.name = name;
        this.date = date;
        
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

    //get date formatted
    getFormattedDate(){
        const day = this.date.split('/')[0];
        const month = this.date.split('/')[1];
        const year = this.date.split('/')[2];
        return `${month}/${day}/${year}`;
    }

}