
import pdfConverter from "jspdf"
import format from "string-format"
import _ from "lodash"
import oslokommunelogo from "../images/oslo_kommune_logo_base64"
import dateformat from "dateformat"

function createHtmlBase(meldingsId, datoTidMottatt, status, innmelderNavn, innmelderTlf, innmelderEpost, beskrivelse, img)
{
  let html = '<div id="renderout" style="boder:5px red solid">'
  html += '<table>'
  html += "<tr><td></td></tr>"
  html += format('<tr><td><strong>{0}</strong><span>{1}</span></td></tr>', "MeldingsId:", meldingsId)
  html += format('<tr><td><strong>{0}</strong><span>{1}</span></td></tr>', "Innmeldt-dato:", datoTidMottatt)
  html += format('<tr><td><strong>{0}</strong><span>{1}</span></td></tr>', "Status:", status)
  html += format('<tr><td><strong>{0}</strong><span>{1}</span></td></tr>', "innmeldt av:", innmelderNavn)
  html += format('<tr><td><strong>{0}</strong><span>{1}</span></td></tr>', "Tel:", innmelderTlf)
  html += format('<tr><td><strong>{0}</strong><span>{1}</span></td></tr>', "Epost:", innmelderEpost)
  html += format('<tr><td><strong>{0}</strong><span>{1}</span></td></tr>', "Beskrivelser:", beskrivelse)
  html += '</table>'
  let imageTag = `<img src="${img}" alt="" style="width:700;height:500;margin:0;" />`
  html += `<div style="border:1px solid red;">${imageTag}</div>`
  html += '</div><br/>'
  return html

}
function CreateHtmlByMeldingId(data, img)
{
  let html = createHtmlBase(data.meldingsID, data.datoTidMottatt, data.typeMelding.aktiv, data.innmelderNavn, data.innmelderTlf, data.innmelderEpost, data.beskrivelse, img)
  return html

}
function CreateHtmlByBrukerId(data)
{
  let html = ''
  _.map(data, (item, val) =>
  {
    let htmlcreator = createHtmlBase(item.meldingsId, "", "", "", "", "", item.beskrivelse, item.kartutsnittBase64)
    html += htmlcreator
  })
  return html
}

function doPdfConvert(html)
{
  const doc = new pdfConverter('p', 'pt', 'letter')
  let logo = oslokommunelogo.imageInBase64
  doc.addImage(logo, 'JPEG', 10, 20, 200, 82)
  doc.setFontSize(10);
  const options = {
    body: {
      'font-size': '11px',
      'background-color': 'red',
      '#renderout': 'color:green'
    }
  }
  const specialElementHandlers = {
    '#bypass': function (element, renderer)
    {
      return true
    }
  };

  doc.fromHTML(html, 10, 100, { 'width': 500, 'elementHandlers': specialElementHandlers }, function (callback)
  {
    doc.save("Meldinger.pdf")
  }, options);

}


function handleDescriptionText(txt)
{
  if (txt.length > 0)
  {
    let split = txt.match(/.{1,127}/g)
    return split
  }
}



export function onPrintDrawByMeldingId(item, img)
{
  const doc = new pdfConverter('p', 'pt', 'letter')
  const xcord = 10
  const addXcord = 15
  let endofline = 600
  doc.setFontSize(10);
  let count = 20

  let logo = oslokommunelogo.imageInBase64
  doc.addImage(logo, 'JPEG', xcord, count, 200, 82)
  count += 50
  let recievedDate = dateformat(item.datoTidMottatt, "dd.mm.yyyy  HH:MM:ss")
  doc.text(440, count, 'Innmeldt: ' + recievedDate);
  count += 50
  doc.setFontSize(10);
  doc.line(xcord, count, endofline, count)
  count += addXcord
  doc.setFontType("bold");
  doc.text(xcord, count, item.typeMelding.beskrivelse);
  doc.text(500, count, item.underTypeMelding);
  count += addXcord
  doc.setFontType("normal")
  doc.line(xcord, count, endofline, count)
  count += addXcord
  doc.text(xcord, count, 'Status: ' + item.underTypeMelding.statusTekst);
  doc.text(200, count, 'Opprettet av: ' + item.bruker);
  doc.text(500, count, 'ID: ' + item.meldingsID);
  count += addXcord
  doc.line(xcord, count, endofline, count)
  count += addXcord
  doc.text(xcord, count, 'Innmeldt av: ' + item.innmelderNavn);
  doc.text(200, count, 'E-post: ' + item.innmelderEpost);
  doc.text(500, count, 'Tel: ' + item.innmelderTlf);
  count += addXcord
  doc.line(xcord, count, endofline, count)
  count += addXcord
  let description = handleDescriptionText(item.beskrivelse)
  if (_.size(description) > 0)
  {
    _.map(description, (i, key2) =>
    {
      if (key2 === 0)
      {
        doc.text(xcord, count, 'Beskrivelse: ' + i);
      }
      else
      {
        doc.text(xcord, count, i);
      }
      count += 20
    })
  }
  count += addXcord
  doc.line(xcord, count, endofline, count)
  if (count > 300)
  {
    doc.addPage()
    doc.addImage(img, 'JPEG', xcord, 10, 580, 350)
  }
  else
  {
    doc.addImage(img, 'JPEG', xcord, count, 580, 350)
  }
  const filename = "MeldingId_" + item.meldingsID + ".pdf"
  doc.save(filename);
}

export function onPrintDrawByBrukerId(data)
{
  const doc = new pdfConverter('p', 'pt', 'letter')
  let xcord = 10
  let endofline = 600
  doc.setFontSize(10);
  let count = 20
  _.map(data, (item, key1) =>
  {
    doc.text(xcord, count, 'MeldingsId: ' + item.meldingsId);
    count += 20
    doc.line(xcord, count, endofline, count)
    count += 20
    let description = handleDescriptionText(item.beskrivelse)
    if (_.size(description) > 0)
    {
      _.map(description, (i, key2) =>
      {
        if (key2 === 0)
        {
          doc.text(xcord, count, 'Beskrivelse: ' + i);
        }
        else
        {
          doc.text(xcord, count, i);
        }
        count += 20
      })
    }
    doc.line(xcord, count, endofline, count)
    count += 20
    let imgData = item.kartutsnittBase64
    if (imgData)
    {
      doc.addImage(imgData, 'JPEG', 10, count, 570, 400)
    }
    doc.addPage()

    count = 20
  })
  doc.save("test.pdf");
}

export function onPrintByMeldingId(data, img)
{
  let html = CreateHtmlByMeldingId(data, img)
  doPdfConvert(html)
}

export function onPrintByBrukerId(data)
{
  let html = CreateHtmlByBrukerId(data)
  doPdfConvert(html)
}