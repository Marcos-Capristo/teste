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
        this.expert = 'Marcos Capristo'
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
    set expert(expert){
        this._expert = expert.trim()
    }
    get expert(){
        return this._expert
    }
    writeNumber(parentElement){
        let texto = 'Laudo Técncio Pericial'
        const numero = document.querySelector('#inumber').value.trim()
        if(numero == ''){
            alert('Digite o número do laudo.')
            document.querySelector('#inumber').focus()
            return
        }
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
        hideModal()
        showModal('#submodalpreamble')
    }
    writePreamble(){
        let director = document.querySelector('#idirector').value.trim()
        if(director == ''){
            alert('Informe o nome do diretor.')
            document.querySelector('#idirector').focus()
            return
        }
        this.expert = document.querySelector('#iexpert').value
        let _expert = this.expert
        let delegate = document.querySelector('#idelegate').value
        if(delegate == ''){
            alert('Informe o nome do delegado.')
            document.querySelector('#idelegate').focus()
            return
        }
        const date = formatDate(report.designatedDate)       
        if(document.querySelector('#selectdireitor').value == 'Diretor'){
            director = `pelo Diretor deste Instituto de Criminalística, o Perito Criminal Dr. ${director}`
        }else{
            director = `pela Diretora deste Instituto de Criminalística, a Perita Criminal Dra. ${director}`
        }
        if(document.querySelector('#selectexpert').value == 'Perito'){
            _expert = `designado o Perito Criminal ${_expert}`
        }else{
            _expert = `designada a Perita Criminal ${_expert}`
        } 
        if(document.querySelector('#selectdelegate').value == 'Delegado'){
            delegate = `o Delegado de Polícia Dr. ${delegate}`
        }else{
            delegate = `a Delegada de Polícia Dra.  ${delegate}`
        }           
        let texto = `Em ${date}, na cidade de Limeira e no Instituto de Criminalística, da Superintendência da Polícia Técnico-Científica, da Secretaria de Segurança Pública do Estado de São Paulo, em conformidade com o disposto no art. 178 do Decreto-Lei 3689 de 3-10-1941 e Decreto-Lei 42847 de 9-2-1998, ${director}, foi ${_expert} para proceder ao Exame Pericial especificado em requisição de exame assinada pela Autoridade Policial, ${delegate}.` 
        document.querySelector('#i_panel_preamble').innerHTML = texto
        hideModal()
        showModal('#submodalobjective')
    }
    writeObjective(){
        const title = document.querySelector('#titleobjective').value.trim()
        if(title == ''){
            title = 'Objetivo'
        }
        const objective = document.querySelector('#iobjective').value.trim()
        if(objective == ''){
            alert('Informeo objetivo')
            document.querySelector('#iobjective').focus()
            return
        }
        const nature = `${document.querySelector('#inature').value}.`
        if(nature == ''){
            alert('Informeo a natureza do exame')
            document.querySelector('#inature').focus()
            return
        }
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
        hideModal()
        showModal('#submodalhistoric')
    }
    writeHistoric(){
        const title = document.querySelector('#titlehistoric').value.trim()
        let date = formatDate(this.examDate)
        let hour = formatTime(document.querySelector('#iexamtime').value)
        let _expert = this.expert
        let local = `${document.querySelector('#ilocaltype').value}`
        let guarnicao = `${document.querySelector('#selectguarnicao').value}, representada na pessoa ${document.querySelector('#iguarnicaopatente').value.trim()} ${document.querySelector('#iguarnicaopessoa').value.trim()}, de posse da viatura ${document.querySelector('#iguarnicaovtr').value.trim()}`
        let texto = ''
        if(document.querySelector('#selectexpert').value == 'Perito'){
            _expert = `o Perito Criminal ${_expert}`
        }else{
            _expert = `a Perita Criminal ${_expert}`
        } 
        let ftp = document.querySelector('#ifotografo').value.trim()
        texto = `Em ${date} às ${hour}, ${_expert} e ${document.querySelector('#selectftp').value} ${ftp},`
        switch(document.querySelector('#selectlocal').selectedIndex){
        case 0:
            texto += ` dirigiram-se ao local indicado, ${local}, e realizaram o exame requisitado. Quando da chegada da equipe, a ${guarnicao}, e que guarnecia o local, deu informes e acompanhou o exame`
            break
        case 1:
            texto += ` realizaram o exame sobre o veículo apresentado na ${local}`
            break
        case 2:
            texto += `dirigiram-se a ${local} e realizaram o exame requisitado. Quando da chegada da equipe, servidroes indicaram o veículo a ser examinado` 
            break  
        case 3:
            texto += `dirigiram-se ao Pátio de Veículos ${local} e realizaram o exame requisitado. Quando da chegada da equipe, funcionários do pátio indicaram o veículo a ser examinado`
            break
        }   
        document.querySelector('#i_panel_historic').innerHTML = `<h2>${title}</h2><p>${texto}.</p>`
        hideModal()
        showModal('#submodalinforms')
    }
    writeInforms(){
        if(quill.getLength()<=100){
            return
        }
        let title = document.querySelector('#titleinforms').value.trim()
        let delta = quill.root.innerHTML
        document.querySelector('#i_panel_informs').innerHTML = `<h2>${title}</h2>${delta}`
    }
    writeLocal(){
        if(quillLocal.getLength()<=100){
            return
        }
        let title = document.querySelector('#titlelocal').value.trim()
        let delta = quillLocal.root.innerHTML
        document.querySelector('#i_panel_local').innerHTML = `<h2>${title}</h2>${delta}`
    }
    writeVeiculo(){
        if(quillVeiculo.getLength()<=100){
            return
        }
        let title = document.querySelector('#titleveiculo').value.trim()
        let delta = quillVeiculo.root.innerHTML
        document.querySelector('#i_panel_veiculo').innerHTML = `<h2>${title}</h2>${delta}`
    }
    writeThing(){
        if(quillThing.getLength()<=100){
            return
        }
        let title = document.querySelector('#titlething').value.trim()
        let delta = quillThing.root.innerHTML
        document.querySelector('#i_panel_thing').innerHTML = `<h2>${title}</h2>${delta}`
    }
    writeCorpuse(){
        if(quillCorpuse.getLength()<=100){
            return
        }
        let title = document.querySelector('#titlecorpuse').value.trim()
        let delta = quillCorpuse.root.innerHTML
        document.querySelector('#i_panel_corpuse').innerHTML = `<h2>${title}</h2>${delta}`
    }

    writeConclusion(){
        if(quillConclusion.getLength()<=100){
            alert('Digite o texto da coclusão.')
            quillConclusion.focus
        }else{
            let title = document.querySelector('#titleconclusion').value.trim()
            let delta = quillConclusion.root.innerHTML
            document.querySelector('#i_panel_conclusion').innerHTML = `<h2>${title}</h2>${delta}`
            hideModal()
        }
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

function formatTime(_hora){
    const hora = _hora.replace(':','h')    
    return hora
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
document.querySelector('#selectlocal').addEventListener('change', function(){
    let element = document.querySelector('#ilocaltype')
    switch(this.selectedIndex){
    case 0:
        element.value = ''
        element.placeholder = 'ex: um imóvel residencial localizado na cidade de Limeira ...'
        break
    case 1:
        element.value = 'base da EPCL - Equipe de Perícias Criminalísticas de Limeira'
        element.placeholder = 'o nome da Base da Equipe de Perícias'
        break
    case 2: 
        element.value = 'base do Plantão Policial da Delegacia Seccional de Limeira'
        element.placeholder = 'o nome da delegacia e da cidade onde foi realizado o exame'
        break
    case 3: 
        element.value = 'pátio Assist na cidade de Limeira'
        element.placeholder = 'o nome do pátio e da cidade onde foi realizado o exame'
        break
    }
})

let btnclose = document.querySelectorAll('.btn_close')
for (let i = 0; i < btnclose.length; i++){
    btnclose[i].addEventListener('click', function(){
        hideModal()
    })
}

var toolbarOptions = ['bold', 'italic', 'underline', 'strike'];
var toolbarOptions1 = ['bold', 'italic', 'underline', 'strike', 'image'];

let quill = new Quill('#quillinforms', {
    modules: {
        toolbar: toolbarOptions
      },
    theme: 'snow'
  });

  let quillLocal = new Quill('#quilllocal', {
    modules: {
        toolbar: toolbarOptions1
      },
    theme: 'snow'
  });

  let quillVeiculo = new Quill('#quillveiculo', {
    modules: {
        toolbar: toolbarOptions1
      },
    theme: 'snow'
  });

  let quillThing = new Quill('#quillthing', {
    modules: {
        toolbar: toolbarOptions1
      },
    theme: 'snow'
  });

  let quillCorpuse = new Quill('#quillcorpuse', {
    modules: {
        toolbar: toolbarOptions1
      },
    theme: 'snow'
  });

  let quillConclusion = new Quill('#quillconclusion', {
    modules: {
        toolbar: toolbarOptions1
      },
    theme: 'snow'
  });

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

document.querySelector('#i_informs').addEventListener('click', function(){
    showModal('#submodalinforms')
})

document.querySelector('#i_local').addEventListener('click', function(){
    showModal('#submodallocal')
})

document.querySelector('#i_veicle').addEventListener('click', function(){
    showModal('#submodalveiculo')
})

document.querySelector('#i_thing').addEventListener('click', function(){
    showModal('#submodalthing')
})

document.querySelector('#i_corpuse').addEventListener('click', function(){
    showModal('#submodalcorpuse')
})

document.querySelector('#i_conclusion').addEventListener('click', function(){
    showModal('#submodalconclusion')
})

document.querySelector('#btn_number').addEventListener('click', function(){
    report.writeNumber('#i_panel_number')
    //hideModal()
    //showModal('#submodalpreamble')
})

document.querySelector('#btn_preamble').addEventListener('click', function(){
    report.writePreamble()
    //hideModal()
    //showModal('#submodalobjective')
})

document.querySelector('#btn_objective').addEventListener('click', function(){
    report.writeObjective()
    //hideModal()
    //showModal('#submodalhistoric')
})

document.querySelector('#btn_historic').addEventListener('click', function(){
    report.writeHistoric()
    //hideModal()
    //showModal('#submodalinforms')
})

document.querySelector('#btn_informs').addEventListener('click', function(){
    report.writeInforms()
    hideModal()
    showModal('#submodallocal')
})

document.querySelector('#btn_local').addEventListener('click', function(){
    report.writeLocal()
    hideModal()
    showModal('#submodalveiculo')
})

document.querySelector('#btn_veiculo').addEventListener('click', function(){
    report.writeVeiculo()
    hideModal()
    showModal('#submodalthing')
})

document.querySelector('#btn_thing').addEventListener('click', function(){
    report.writeThing()
    hideModal()
    showModal('#submodalcorpuse')
})

document.querySelector('#btn_corpuse').addEventListener('click', function(){
    report.writeCorpuse()
    hideModal()
    showModal('#submodalconclusion')
})

document.querySelector('#btn_conclusion').addEventListener('click', function(){
    report.writeConclusion()
})

function imprimir(){
    document.title = `Laudo Técnico Pericial ${report.number}/${report.designatedDate.getFullYear()} - ${report.expert}`
    print() 
}

function teste(){
    quillVeiculo.root.innerHTML+='<h3>Outro Parágrafo acrescentado depois</h3>'
}



/*

Falta verificar se algumas caixas estão em branco para pular sem escrever no laulo.
Criar a lista de quesitos.
Ordenar Numericamente os títulos.
Criar o módulo de vistoria de veículos.
Criar módulo de cadáveres.
Criar o móvulo de peças.
Criar o módulo de conclusão.


*/