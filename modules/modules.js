class Panel{

    costructor(){
        this.header = ''
        this.footer = ''
        this.msg = ''
    }
    set header(header){
        this._header = header.trim()
    }
    get header(){
        return this._header
    }    
    create(){
        let element = document.createElement('div')
        element.className = 'panel'
        element.innerHTML = 
        `<div>
            <div class = 'panel_header'><h2>${this.header}</h2></div>
            <div class = 'panel_contents'><br><br>
            <input type = 'button' value="Aceitar">
            <input type = 'button' value="Apagar">
            </div>
            <div class = 'panel_footer'>${this.footer}  
            </div>
        </div>`
        document.body.appendChild(element)
    }    
}

class Report{
    constructor(){
        this.number = ''
        this.designatedDate = new Date()
    }
    set number(number){
        this._number = number.toUpperCase()
    }
    get number(){
        return this._number
    }
    set designatedDate(designatedDate){
        this._designatedDate = new Date(designatedDate)
    }
    get designatedDate(){
        return this._designatedDate
    }
    writeNumber(parentElement){
        let texto = 'Laudo Técncio Pericial'
        const numero = document.querySelector('#inumber').value
        const data = document.querySelector('#idesignationdate').value
        if(numero != ''){
            this.number = numero
        }
        //if(data instanceof Date){
            this.designatedDate = data
       // }
        //if (this.number != ''){
            texto = `Laudo ${this.number}`
        //}
        //if (this.designatedDate != ''){
            texto += `/${this.designatedDate.getFullYear()}`
        //}
        const element = document.querySelector(parentElement)
        element.className = 'title_0'
        element.innerHTML=texto
    }
}

const report = new Report()

function showModal(){
    const modal = document.querySelector('#modal').style
    modal.display = 'block'
}

function hideModal(){
    const modal = document.querySelector('#modal').style
    const submodal = document.querySelectorAll('.submodal')
    modal.display = 'none'
    modal.transition = '2.5s'
    for (let i = 0; i < submodal.length; i++) {
        submodal[i].style.display = "none";
    }
}

function todayDate() {
    var d = new Date(), // para atual retirar o date e na invocação da função retirar o argumento.
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
}
document.querySelector('#idesignationdate').value = todayDate('Sun May 11,2014');

const menuNumber = document.querySelector('#i_number')
menuNumber.addEventListener('click', function(){
    showModal()
    document.querySelector('#submodalnumber').style.display = 'block'
})

const btnNumber = document.querySelector('#btn_number')
btnNumber.addEventListener('click', function(){
    report.writeNumber('#i_panel_number')
    hideModal()
})