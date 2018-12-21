export default function ({ $axios, redirect }) {
  $axios.setHeader('X-TOKEN', '330d207892855dbd5abd5147ea562094')
​  $axios.setHeader('Authorization', 'Basic ZGVtby5ib29rMjQ6Ym9vazI0')

  $axios.onRequest(config => {
    console.log('Making request to ' + config.url)
  })
​
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      // redirect('/400')
    }
  })
}
