// Untuk initialize app
const admin = require('firebase-admin')
// directory letak kunci pribadi firebase
const serviceAccount  = require('./fir-lesson-98245-firebase-adminsdk-9zre9-afa778dcc2.json')

// initializeApp
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // Ganti dengan database URL kamu
    databaseURL: 'https://bangkit-po-default-rtdb.asia-southeast1.firebasedatabase.app/'
})

// initialize database dan letak child
let ref = admin.database().ref('node-client')
let messageRef = ref.child('messages').push()
// Mendapatkan key push
let messageKey = messageRef.key

// Directory temp
let payload ={}
let message = {
    text: 'hey guys'
}

// untuk push dua directory sekaligus
payload['userMessages/' + messageKey] = message
payload['logs/' + messageKey] = message

// Menggunakan updata
ref.update(payload)

// Kalau di sql seperti trigger
ref.child('logs').on('child_added', function(snap) {
    console.log('added', snap.val())
})
ref.child('logs').on('child_removed', function(snap) {
    console.log('removed', snap.val())
})
ref.child('logs').on('child_changed', function(snap) {
    console.log('changed', snap.val())
})

// Mendapatkan isi database
ref.once('value')
    .then(function(snap) {
        console.log(snap.val())
    })

// Cara push yang lain tapi ini tidak ada keynya dan apabila gunain set data lama akan terhapus.
messagesRef.set({
    name: 'clevo',
    admin: true,
    count: 1,
    text: 'hey guys'
})

// Otomatis dibuat kan key atau kunci uniq
messagesRef.push({
    name: 'clevo',
    admin: true,
    count: 1,
    text: 'hey guys'
})