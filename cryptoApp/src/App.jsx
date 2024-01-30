import { Layout } from 'antd';
import AppHeader from './components/layout/AppHeader';
import AppSider from './components/layout/AppSider';
import AppContent from './components/layout/AppContent';
import WithCryptoContext from './context/crypto-context';


export default function App() {
  return (
    <WithCryptoContext>
      <Layout>
        <AppHeader />
        <Layout>
          <AppSider />
          <AppContent />
        </Layout>
      </Layout>
    </WithCryptoContext>
  )
}
