
import pdfConverter from "jspdf"
import _ from "lodash"
//import oslokommunelogo from "../images/oslo_kommune_logo_base64"
import png from "../images/png"
import dateFormat from "dateformat"

function WormMapper(melding)
{
  let recievedMessageDate = melding.datoTidMottatt ? melding.datoTidMottatt : ""
  let type = melding.meldingType ? melding.meldingType : ""
  let underType = melding.undermeldingType ? melding.undermeldingType : ""
  let status = melding.status ? melding.status : ""
  let createdBy = melding.opprettetAv ? melding.opprettetAv : ""
  let messageId = melding.meldingsId ? melding.meldingsId : ""
  let informedByName = melding.innmelderNavn ? melding.innmelderNavn : ""
  let informedByEmail = melding.innmelderEpost ? melding.innmelderEpost : ""
  let informedByTelefon = melding.innmelderTlf ? melding.innmelderTlf : ""
  let messageDescription = melding.beskrivelse ? melding.beskrivelse : ""
  let streetName = melding.gateNavn ? melding.gateNavn : ""
  let eastpoint = melding.pointEast ? melding.pointEast : ""
  let northpoint = melding.pointNorth ? melding.pointNorth : ""
  let notes = melding.interneNotater ? melding.interneNotater : ""
  let zone = melding.sone ? melding.sone : ""

  return {
    InnmeldtDato: recievedMessageDate, Type: type, UnderType: underType, Status: status, Sone: zone,
    Opprettetav: createdBy, MeldingId: messageId, Innmeldtav: informedByName, Epost: informedByEmail,
    Tel: informedByTelefon, Gatenavn: streetName, Beskrivelse: messageDescription, Eastpoint: eastpoint, Northpoint: northpoint, Notater: notes
  }
}

function handleMultipleLineText(title, txt, xcord, ycord, doc)
{
  if (txt.length > 0)
  {
    let merged=  title+txt
    let cleantext = merged.replace(/\r?\n/g, '').replace(/\s+/g, ' ')
    // let firstline = cleantext.substring(0, 114)
    // let restofline = cleantext.substring(114, cleantext.length)
    let splitedText = doc.splitTextToSize(cleantext,575) //restofline.match(/.{1,128}/g)
    //doc.text(xcord, ycord, title + firstline);
    //ycord += 20    
    if (_.size(splitedText) > 0)
    {
      _.map(splitedText, (i) =>
      {
        doc.text(xcord, ycord, i);
        ycord += 20
      })
    }
  }
  else
  {
    doc.text(xcord, ycord, title);
    ycord += 20
  }
  return ycord
}

function formatDate(dato)
{
  if (dato.length > 0)
  {
    return dateFormat(dato, "dd.mm.yyyy  HH:MM")
  }
  return ""
}
function FormatDateForMeldingFileName(meldingsId)
{
  let date= dateFormat(Date.now(), "yyyymmdd_HHMMss")
  return "Bymelding_"+date+"_"+meldingsId+".pdf"

}
function FormatDateForMeldingerFileName()
{
  let date= dateFormat(Date.now(), "yyyymmdd_HHMMss")
  return "Bymelding_"+date+".pdf"
  
}
function drawContent(data, xcord, ycord, addXcord, endofline, doc)
{
  let rightMargin = 500
  let rightMarginUnderTypeAndDato = 410
  let middlemargin = 260
  let melding = WormMapper(data)
  ycord += 15
  let innmeldtDato = formatDate(melding.InnmeldtDato)
  //doc.text(rightMarginUnderTypeAndDato, ycord, 'Innmeldt-dato: ' + innmeldtDato);
  //ycord += addXcord
  doc.setFontSize(10);
  //doc.line(xcord, ycord, endofline, ycord)
  ycord += addXcord
  doc.setFontType("bold");
  doc.text(xcord, ycord, melding.Type);
  doc.text(rightMarginUnderTypeAndDato, ycord, melding.UnderType);
  ycord += addXcord
  doc.setFontType("normal")
  doc.line(xcord, ycord, endofline, ycord)
  ycord += addXcord
  doc.text(xcord, ycord, 'Status: ' + melding.Status);
  //doc.text(middlemargin, ycord, 'Opprettet av: ' + melding.Opprettetav);
  doc.text(middlemargin, ycord, 'Innmeldt: ' + innmeldtDato);
  doc.text(rightMargin, ycord, 'ID: ' + melding.MeldingId);
  ycord += addXcord
  doc.line(xcord, ycord, endofline, ycord)
  ycord += addXcord
  doc.text(xcord, ycord, 'Innmeldt av: ' + melding.Innmeldtav);
  doc.text(middlemargin, ycord, 'E-post: ' + melding.Epost);
  doc.text(rightMargin, ycord, 'Tel: ' + melding.Tel);
  ycord += addXcord
  doc.line(xcord, ycord, endofline, ycord)
  ycord += addXcord
  doc.text(xcord, ycord, 'Lokasjon: ' + melding.Gatenavn);
  doc.text(rightMarginUnderTypeAndDato, ycord, 'Sone: ' + melding.Sone);
  ycord += addXcord
  doc.line(xcord, ycord, endofline, ycord)
  ycord += addXcord
  ycord = handleMultipleLineText("Beskrivelse: ", melding.Beskrivelse, xcord, ycord, doc)
  doc.line(xcord, ycord, endofline, ycord)
  ycord += addXcord
  ycord = handleMultipleLineText("Interne notater: ", melding.Notater, xcord, ycord, doc)
  doc.line(xcord, ycord, endofline, ycord)
  ycord += addXcord
  return ycord
}



function drawLink(xcord, ycord, eastpoint, northpoint, doc)
{
  doc.setFontSize(11)
  doc.setTextColor(0, 0, 255)
  //let zoom = '19z'
  let link = "https://www.google.no/maps/?q=" + eastpoint.toString() + "," + northpoint.toString()
  doc.text(xcord, ycord, link)
  doc.setTextColor(0, 0, 0)
}

function mergeKartLagImages(xcord, ycord, data, doc)
{
  let icon = png.icon
  let width = 580
  let height = 350
  doc.addImage(data.basisKartBase64, 'PNG', xcord, ycord, width, height, null, 'FAST')
  doc.addImage(data.kartLagBase64, 'PNG', xcord, ycord, width, height, null, "FAST")
  let xMiddlePoint = xcord + width / 2
  let yMiddlePoint = ycord + height / 2
  doc.addImage(icon, 'PNG', xMiddlePoint, yMiddlePoint, 15, 15, null, 'FAST');
}

export function onPrintDrawByMeldingId(data)
{
  const doc = new pdfConverter('p', 'pt', 'letter')
  let ycord = 15
  const xcord = 20
  const addXcord = 15
  let endofline = 600
  let mapXmaring = 415
  doc.setFontSize(10);
  //ycord = createLogo(xcord, ycord, doc)
  ycord += drawContent(data, xcord, ycord, addXcord, endofline, doc)
  doc.setFontSize(40);
  //let img = data.kartutsnittBase64
  if (ycord > mapXmaring)
  {
    doc.addPage()
    ycord = 10
    drawLink(xcord, ycord, data.breddegrad, data.lengdegrad, doc)
    ycord += 10
    //drawImage(img, xcord, 10, endofline, doc)
    mergeKartLagImages(xcord, ycord, data, doc)
  }
  else
  {
    drawLink(xcord, ycord, data.breddegrad, data.lengdegrad, doc)
    ycord += 10
    //drawImage(img, xcord, mapXmaring, doc)
    mergeKartLagImages(xcord, ycord, data, doc)

  }
  let filename = FormatDateForMeldingFileName( data.meldingsId)
  doc.save(filename);
}
function breakPage(index, sizeofArray, doc)
{
  if (index !== sizeofArray - 1)
  {
    doc.addPage()
  }
}
export function onPrintDrawByBrukerId(data)
{
  const doc = new pdfConverter('p', 'pt', 'letter')
  let ycord = 15
  const xcord = 20
  const addXcord = 15
  let endofline = 600
  let mapXmaring = 415
  doc.setFontSize(10);
  let sizeofArray = _.size(data)
  _.forEach(data, (k, v) =>
  {
    //ycord = createLogo(xcord, ycord, doc)
    ycord += drawContent(k, xcord, ycord, addXcord, endofline, doc)
    //let img = k.kartutsnittBase64
    if (ycord > mapXmaring)
    {
      doc.addPage()
      ycord = 10
      drawLink(xcord, ycord, k.breddegrad, k.lengdegrad, doc)
      ycord += 10
      //drawImage(img, xcord, 10, doc)
      mergeKartLagImages(xcord, ycord, k, doc)
      breakPage(v, sizeofArray, doc)
    }
    else
    {
      drawLink(xcord, ycord, k.breddegrad, k.lengdegrad, doc)
      ycord += 10
      //drawImage(img, xcord, mapXmaring, doc)
      mergeKartLagImages(xcord, ycord, k, doc)
      breakPage(v, sizeofArray, doc)
    }
    ycord = 20
  })
  let filename = FormatDateForMeldingerFileName()
  doc.save(filename);
}

/*
function drawImage(img, xcord, ycord, doc)
{
  if (img.length > 0)
  {
    //doc.line(xcord, ycord, endofline, ycord)
    doc.addImage(img, 'JPEG', xcord, ycord, 580, 350)
  }
}

function createLogo(xcord, ycord, doc)
{
  let logo = oslokommunelogo.imageInBase64
  doc.addImage(logo, 'JPEG', xcord, ycord, 100, 41)
  ycord += 30
  return ycord
}

*/