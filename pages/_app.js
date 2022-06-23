import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  return(
    <>
      <Component {...pageProps} />
      <footer>
        <p>This is a footer</p>
      </footer>
    </>
  )
}

export default MyApp
