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
        this.examDate = new Date()
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
    set examDate(examDate){
        this.__examDate = new Date(examDate)
    }
    get examDate(){
        return this.__examDate
    }
    writeNumber(parentElement){
        let texto = 'Laudo Técncio Pericial'
        const numero = document.querySelector('#inumber').value
        const data = document.querySelector('#idesignationdate').value
        if(numero != ''){
            this.number = formatMilhar(numero)
        }
        this.designatedDate = data
        texto = `Laudo ${this.number}`
        texto += `/${this.designatedDate.getFullYear()}`
        const element = document.querySelector(parentElement)
        element.className = 'title_0'
        element.innerHTML=texto
    }
    writePreamble(){
        const date = formatDate(report.designatedDate)
        let director = document.querySelector('#idirector').value
        let expert = document.querySelector('#iexpert').value
        let delegate = document.querySelector('#idelegate').value
        if(document.querySelector('#selectdireitor').value == 'Diretor'){
            director = `pelo Diretor deste Instituto de Criminalística, o Perito Criminal Dr. ${director}`
        }else{
            director = `pela Diretora deste Instituto de Criminalística, a Perita Criminal Dra. ${director}`
        }
        if(document.querySelector('#selectexpert').value == 'Perito'){
            expert = `designado o Perito Criminal ${expert}`
        }else{
            expert = `designada a Perita Criminal ${expert}`
        } 
        if(document.querySelector('#selectdelegate').value == 'Delegado'){
            delegate = `o Delegado de Polícia Dr. ${delegate}`
        }else{
            delegate = `a Delegada de Polícia Dra.  ${delegate}`
        }           
        let texto = `Em ${date}, na cidade de Limeira e no Instituto de Criminalística, da Superintendência da Polícia Técnico-Científica, da Secretaria de Segurança Pública do Estado de São Paulo, em conformidade com o disposto no art. 178 do Decreto-Lei 3689 de 3-10-1941 e Decreto-Lei 42847 de 9-2-1998, ${director}, foi ${expert} para proceder ao Exame Pericial especificado em requisição de exame assinada pela Autoridade Policial, ${delegate}.` 
        document.querySelector('#i_panel_preamble').innerHTML = texto
    }
    writeObjective(){
        const title = document.querySelector('#titleobjective').value.trim()
        const objective = document.querySelector('#iobjective').value
        const nature = `${document.querySelector('#inature').value}.`
        const selectRdo = document.querySelector('#selectrdo').value
        const year = this.designatedDate.getFullYear()
        let rdo = `${document.querySelector('#irdo').value.toUpperCase().trim()}`
        let delpol = document.querySelector('#idelpol').value.trim()
        if(delpol!=''){
            delpol = ` - ${delpol}`
        }
        if(selectRdo == 'Tel'){
            rdo = `recebida via telefonema e e-mail${delpol}`
        }else{
            rdo = `referente ao ${selectRdo} ${rdo}/${year}${delpol},`
        }
        const texto = `O objetivo do exame pericial, em conformidade com a requisição ${rdo} era ${objective}, sendo sua natureza, ${nature}`
        document.querySelector('#i_panel_objective').innerHTML = `<h2>${title}</h2><p>${texto}</p>`
    }
    writeHistoric(){
        const title = document.querySelector('#titlehistoric').value.trim()
        let expert = document.querySelector('#iexpert').value.trim()
        let local = `, ${document.querySelector('#ilocaltype').value.trim()}`
        if(document.querySelector('#selectexpert').value == 'Perito'){
            expert = `o Perito Criminal ${expert}`
        }else{
            expert = `a Perita Criminal ${expert}`
        } 
        let date = formatDate(report.examDate)
        let ftp = document.querySelector('#ifotografo').value.trim()
        if (ftp != ''){
            ftp = `a equipe pericial, composta pel${expert} e ${document.querySelector('#selectftp').value} ${ftp},`
            }else{
            ftp = `${expert}`
            }
        const texto = `Em ${date}, ${ftp} dirigiu-se-se ao local indicado`
        document.querySelector('#i_panel_historic').innerHTML = `<h2>${title}</h2><p>${texto}${local}.</p>`
    }
}

const report = new Report()

function inverter(num){
    num1 = num
    resultado = ''
    for (i=num1.length-1;i>=0;i--){
        resultado+=num1[i]
    }
    return resultado
}

function formatMilhar(num){
let num1 = inverter(num)
resultado = ''
    for(i=0;i<num1.length;i++){
        resultado += num1[i]
        if (i%3==2 && i!=num1.length-1){
            resultado += `.` 
        }               
    }
    return inverter(resultado)
}

function formatDate(data){
    const date = new Date(data)
    const day = date.getDate()
    const month = date.getMonth()+1
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
}

function showModal(element){
    const modal = document.querySelector('#modal').style
    const submodal = document.querySelector(element).style
    hideModal()
    modal.opacity = '1'   
    modal.pointerEvents = 'all'
    modal.transition = '0.5s'
    submodal.display = 'block'
    submodal.opacity = '1'   
    submodal.pointerEvents = 'all'
    submodal.transition = '0.5s'
}

function hideModal(){
    const modal = document.querySelector('#modal').style
    const submodal = document.querySelectorAll('.submodal')
    modal.opacity = '0'   
    modal.pointerEvents = 'none'
    modal.transition = '0.5s'
    for (let i = 0; i < submodal.length; i++) {
        submodal[i].style.opacity = '0'
        submodal[i].transition = '0.5s'
        submodal[i].pointerEvents = 'none'
        submodal[i].style.display = 'none'
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
document.querySelector('#iexamdate').value = todayDate('Sun May 11,2014');

document.querySelector('#i_number').addEventListener('click', function(){
    showModal('#submodalnumber')
})

document.querySelector('#i_preamble').addEventListener('click', function(){
    showModal('#submodalpreamble')
})

document.querySelector('#i_objective').addEventListener('click', function(){
    showModal('#submodalobjective')
})

document.querySelector('#i_historic').addEventListener('click', function(){
    showModal('#submodalhistoric')
})

document.querySelector('#btn_number').addEventListener('click', function(){
    report.writeNumber('#i_panel_number')
    hideModal()
})

document.querySelector('#btn_preamble').addEventListener('click', function(){
    report.writePreamble()
    hideModal()
})

document.querySelector('#btn_objective').addEventListener('click', function(){
    report.writeObjective()
    hideModal()
})

document.querySelector('#btn_historic').addEventListener('click', function(){
    report.writeHistoric()
    hideModal()
})