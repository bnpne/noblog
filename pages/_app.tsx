import { AppProps } from 'next/app'
import '../styles/style.css'
import 'react-notion/src/styles.css'
import 'prismjs/themes/prism-tomorrow.css'


export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
