import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  return(
    <>
      <Component {...pageProps} />
      <footer>
      </footer>
    </>
  )
}

export default MyApp
