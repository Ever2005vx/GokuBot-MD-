import db from '../lib/database.js'
import { createHash } from 'crypto'
import fs from 'fs'
import fetch from 'node-fetch'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, usedPrefix, command }) {
  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender)
  if (user.registered === true) throw `*Ya estás registrado*\n\n*¿Quiere volver a registrarse?*\n\nUse este comando para eliminar su registro \n*${usedPrefix}unreg* <Número de serie>`
  if (!Reg.test(text)) throw `*Formato incorrecto*\n\nUso del comamdo: *${usedPrefix + command} nombre.edad*\nEjemplo : *${usedPrefix + command} ${name2}.16*`
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) throw 'El nombre no puede estar vacío'
  if (!age) throw 'La edad no puede estar vacía'
  if (name.length >= 100) throw 'El nombre es demasiado largo' 
  age = parseInt(age)
  if (age > 100) throw '👴🏻 Wow el abuelo quiere jugar al bot'
  if (age < 5) throw '🚼  hay un abuelo bebé jsjsj '
  user.name = name.trim()
  user.age = age
  user.regTime = + new Date
  user.registered = true
  let sn = createHash('md5').update(m.sender).digest('hex')
  let img = await (await fetch('https://tinyurl.com/225ul2sg')).buffer()  
  let str = `*–  R E G I S T R O  -  U S E R  –*

✧ *Nombre:* ${name}
✧ *Edad* : ${age} años
✧ *Numero de serie* :
${sn}`
conn.sendMessage(m.chat, {
text: str,
contextInfo: { 
forwardingScore: 9999, 
isForwarded: true, 
externalAdReply: {
title: botname,
body: textbot,
thumbnailUrl: img,
thumbnail: img,
sourceUrl: global.canal,
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m})
}
handler.help = ['reg'].map(v => v + ' *<nombre.edad>*')
handler.tags = ['rg']

handler.command = ['verify', 'reg', 'register', 'registrar'] 

export default handler