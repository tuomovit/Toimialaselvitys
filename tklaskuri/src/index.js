import React, { useState } from 'react';
import ReactDOM from 'react-dom'
import data from "./kuntienavainluvut1"; 
import './App.css';
import datavaakunat from "./vaakunaKuvat"
import dataverot from "./verotietoja"



const App = () => {
    
    
  const [ counter, setCounter ] = useState(0)
  const [ muutosIndeksi, asetaMuutos ] = useState(0)

  const setToValue = (value) => setCounter(value)

  const asetaMuutosArvo = (value) => asetaMuutos(value)

  	//objektilista kuntien nimistä
    const kuntienNimet = data.dataset.dimension["Alue 2019"].category.label
    //objektilista asukasluvuista
    const pktiedot = data.dataset.value

    var kuntienAsLuvut = [];
    for (let i = 0, j = 0; i < pktiedot.length; i+=4, j++){
      kuntienAsLuvut[j] = pktiedot[i];
    }
    var vlMuutokset = [];
    for (let i = 1, j = 0; i < pktiedot.length; i+=4, j++){
      vlMuutokset[j] = pktiedot[i];
    }
    var tyoAsteet = [];
    for (let i = 2, j = 0; i < pktiedot.length; i+=4, j++){
      tyoAsteet[j] = pktiedot[i];
    }
    var tpLukumaarat = [];
    for (let i = 3, j = 0; i < pktiedot.length; i+=4, j++){
      tpLukumaarat[j] = pktiedot[i];
    }
    //objektilista kuntien indekseistä
    const kuntienIndeksit = data.dataset.dimension["Alue 2019"].category.index

    const verotiedot = dataverot.dataset.value

    

    const vaakunat = datavaakunat.selection1

    

    var nimiTaulukko = [];
    var kuntienIit = [];
    var vaakunaTaulukko = [];


    
    
    // kuntien nimet taulukkoon
    for (var x in kuntienNimet) {
        nimiTaulukko.push(kuntienNimet[x]);
    }

    const verokategoriat = dataverot.dataset.dimension.Tiedot.category.label 
    const solujenLkmPerVuosi = nimiTaulukko.length * Object.keys(verokategoriat).length
    console.log(solujenLkmPerVuosi)
    //vuodet 2005-2017 taulukossa indeksistä 0 alkaen
    const veroTietojenVuodet = Object.keys(dataverot.dataset.dimension.Vuosi.category.label)
    console.log(veroTietojenVuodet)

    var verodata2017indeksi = (veroTietojenVuodet.length - 1) * solujenLkmPerVuosi
    console.log(verodata2017indeksi)

    var tulonsaajat = [];
    for (let i = verodata2017indeksi, j = 0; i < solujenLkmPerVuosi*veroTietojenVuodet.length; i+=6, j++){
      tulonsaajat[j] = verotiedot[i];
    }
    //console.log(tulonsaajat)

    var veronalaisetTulotKeskimaarin = [];
    for (let i = verodata2017indeksi + 1, j = 0; i < solujenLkmPerVuosi*veroTietojenVuodet.length; i+=6, j++){
      veronalaisetTulotKeskimaarin[j] = verotiedot[i];
    }

     var ansioTulotKeskimaarin = [];
    for (let i = verodata2017indeksi + 2, j = 0; i < solujenLkmPerVuosi*veroTietojenVuodet.length; i+=6, j++){
      ansioTulotKeskimaarin[j] = verotiedot[i];
    }

     var verotYhteensaKeskimaarin = [];
    for (let i = verodata2017indeksi + 3, j = 0; i < solujenLkmPerVuosi*veroTietojenVuodet.length; i+=6, j++){
      verotYhteensaKeskimaarin[j] = verotiedot[i];
    }

    var valtionVeroKeskimaarin = [];
    for (let i = verodata2017indeksi + 4, j = 0; i < solujenLkmPerVuosi*veroTietojenVuodet.length; i+=6, j++){
      valtionVeroKeskimaarin[j] = verotiedot[i];
    }

    var kunnallisVeroKeskimaarin = [];
    for (let i = verodata2017indeksi + 5, j = 0; i < solujenLkmPerVuosi*veroTietojenVuodet.length; i+=6, j++){
      kunnallisVeroKeskimaarin[j] = verotiedot[i];
    }

    // kuntien indeksit taulukkoon
    for (var x in kuntienIndeksit) {
        kuntienIit.push(kuntienIndeksit[x]);
    }

    var avain;
    var arvo;
    var nimetJaIndeksit = {};

    // kuntien nimet ja indeksit mapitettuna yhteen objektilistaan
    for (var i = 0; i < nimiTaulukko.length; i++){
    	avain = kuntienIit[i];
    	arvo = nimiTaulukko[i];
    	nimetJaIndeksit[avain] = arvo;
    }

    const jarjestetty = {};
    // objektilistan järjestys avainarvon eli indeksin mukaan
    Object.keys(nimetJaIndeksit).sort().forEach(function(key) {
  	jarjestetty[key] = nimetJaIndeksit[key];
	});

    // Kuntien nimien erotus järjestetystä objektilistasta
	var nimetJarjestyksessa = [];
	for (var x in jarjestetty) {
        nimetJarjestyksessa.push(jarjestetty[x]);
    }

    // Hakutoiminto, ottaa inputista valuen ja vertaa sitä selectin valueihin
    // piilottaa valuet, jotka eivät vastaa hakusanaa
    var select
    var haettava 
    const etsi = (hakusana) => {
    	
    	haettava = hakusana.target.value
    	console.log(haettava)
 	  	select = document.getElementById("listaKunnista");
    	for (var i = 0; i < select.length; i++){
    		var txt = select[i].text
    		var include = txt.toLowerCase().startsWith(haettava.toLowerCase());
    		select.options[i].style.display = include ? 'list-item' : 'none';
    	} 

    } 

    var asukasLukuI;
    var listaI;
    // ottaa selectistä valuen ja tulostaa sen
    const tulosta = (listaValittu) => {
    	
      listaI = listaValittu.target.value
      //console.log(listaIndex)
      setToValue(listaI)
      asetaMuutosArvo(listaI)
      //console.log(counter)
      //console.log(muutosIndeksi)
    }

    // asukasluvut löytyvät taulukosta neljän indeksin välein ([0,4,8,...])
    var asukaslukuInd = 0;

    // valintalista kunnista, indeksöi samalla 0->n
    return (
    // Bootstrapin pääcontainer
    <div className="container">	

      <div class="row justify-content-md-center">
      
      <div class="btn-group btn-group-lg">
      <button type="button" class="btn btn-primary" aria-pressed="true">Toimialat</button>
      <button type="button" class="btn btn-primary" aria-pressed="true">Paikkakunnat</button>
      </div>
      </div>

        <div className="row">
          <div className="col-sm">

          	<div>
        <input type="text" id="search" name="search" placeholder="Hae..." onKeyUp={etsi}/>
            </div>
        
            <select id="listaKunnista"className="form-control" size="28" onChange={tulosta} >

            {nimetJarjestyksessa.map(s => (<option value={asukaslukuInd++}>{s}</option>))} 
            </select>

          </div>

          <div className="col-10">

        

            

            <br />
            <div className="row">
            <div class="col jumbotron">

            <div className="tiedotheader">
              <h5>{nimetJarjestyksessa[counter]}</h5> 
              
              <img src={vaakunat[counter].image} alt="new" align="right"/>
            </div>

            <ul class="list-group list-group-horizontal">
  
            <ul class="list-group">

            <li class="list-group-item"><small class="text-muted">Kunnan asukasluku: </small>{kuntienAsLuvut[counter]}</li>
            <li class="list-group-item"><small class="text-muted">Väkiluvun muutos edellisestä vuodesta: </small> {vlMuutokset[counter] + "%"}</li>
            <li class="list-group-item"> <small class="text-muted">Työllisyysaste: </small> {tyoAsteet[counter] + "%"}</li>
            <li class="list-group-item"> <small class="text-muted">Työpaikkojen lukumäärä: </small> {tpLukumaarat[counter]}</li>
            <li class="list-group-item"><small class="text-muted">Tulonsaajia: </small> {tulonsaajat[counter]}</li>
            </ul>

            <ul class="list-group">

            <li class="list-group-item"><small class="text-muted">Veronalaiset tulot keskimäärin: </small> {veronalaisetTulotKeskimaarin[counter] + "€/vuosi"}</li>
            <li class="list-group-item"><small class="text-muted">Ansiotulot keskimäärin: </small> {ansioTulotKeskimaarin[counter]+ "€/vuosi"}</li>
            <li class="list-group-item"><small class="text-muted">Verot yhteensä keskimäärin: </small> {verotYhteensaKeskimaarin[counter]+ "€/vuosi"}</li>
            <li class="list-group-item"><small class="text-muted">Valtionvero keskimäärin: </small> {valtionVeroKeskimaarin[counter]+ "€/vuosi"}</li>
            <li class="list-group-item"><small class="text-muted">Kunnallisvero keskimäärin: </small> {kunnallisVeroKeskimaarin[counter]+ "€/vuosi"}</li>
            </ul>

            </ul>

            </div>
            </div>


            <div class="row">
    <div class="col jumbotron">
      1 of 2
      sq
      <br></br>
      sq
      <br></br>
      sq
      <br></br>
      sq
      <br></br>
      sq
      sq
    </div>
    
  </div>

        </div>

        


        </div>		
      </div>
    )

    
 }

ReactDOM.render(
  React.createElement(App, null),
  document.getElementById('root')
)