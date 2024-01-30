import { Layout, Select, Space, Button, Modal, Drawer } from 'antd';
import { useCrypto } from '../../context/crypto-context'
import { useEffect, useState } from 'react';
import CoinInfoModal from '../CoinInfoModal';
import AddAssetForm from '../AddAssetForm';

const headerStyle = {
    width: '100%',
    textAlign: 'center',
    height: 60,
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
};

export default function AppHeader() {
    const [select, setSelect] = useState(false);
    const [coin, setCoin] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { crypto } = useCrypto(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    useEffect(() => {
        const keypress = (e) => {
            if (e.key === '/') {
                setSelect(prev => !prev)
            }
        }
        document.addEventListener('keypress', keypress)
        return () => document.removeEventListener('keypress', keypress)
    }, [])

    function handleSelect(e) {
        setCoin(crypto.find(c => c.id === e));
        showModal(e);
    }

    return (
        <Layout.Header style={headerStyle}>
            <Select
                style={{
                    width: '250px',
                }}
                open={select}
                onClick={() => setSelect(prev => !prev)}
                onSelect={handleSelect}
                placeholder="press / to open"
                optionLabelProp="label"
                options={crypto.map(coin => ({
                    label: coin.name,
                    value: coin.id,
                    icon: coin.icon
                }))}
                optionRender={(option) => (
                    <Space>
                        <img style={{ width: '20px' }} src={option.data.icon} /> {option.data.label}
                    </Space>
                )}
            />
            <Button
                type="primary"
                onClick={() => setIsDrawerOpen(true)}
            >
                Add Asset
            </Button>

            <Modal
                open={isModalOpen}
                onOk={() => setIsModalOpen(false)}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
            >
                <CoinInfoModal coin={coin} />
            </Modal>

            <Drawer
                title="Add Asset"
                onClose={() => setIsDrawerOpen(false)}
                open={isDrawerOpen}
                destroyOnClose
            >
                <AddAssetForm onClose={() => setIsDrawerOpen(false)} />
            </Drawer>
        </Layout.Header>
    )
}