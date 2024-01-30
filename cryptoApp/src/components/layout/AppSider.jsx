import { Layout, Card, Statistic, Spin, List, Typography, Tag  } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { fakeFetchAssests, fakeFetchCrypto } from '../../api';
import { useContext, useEffect, useState } from 'react';
import { percentDifference, capitalize } from '../../utils'
import {CryptoContext} from '../../context/crypto-context'

const siderStyle = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#1677ff',
};

export default function AppSider() {
    
    const {assets, loading} = useContext(CryptoContext)

    if (loading) {
        return < Spin fullscreen />
    }

    return (
        <Layout.Sider width="20%" style={siderStyle}>
            {assets.map(asset => (
                <Card
                    key={asset.id}
                    style={{ marginBottom: '10px' }}>
                    <Statistic
                        title={capitalize(asset.id)}
                        value={asset.totalAmount}
                        precision={2}
                        valueStyle={{ color: asset.grow ? '#3f8600' : '#cf1322' }}
                        prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                        suffix="$"
                    />
                    <List
                        size='small'
                        dataSource={[
                            { title: 'Total Profit', value: asset.totalProfit, withTag: true },
                            { title: 'Asset amount', value: asset.amount, isPlain: true },
                            { title: 'Difference', value: asset.growPercent },
                        ]}
                        renderItem={(item) => (
                            <List.Item>
                                <span>{item.title}</span>
                                <span>
                                    {item.withTag && <Tag color={asset.grow ? 'green' : 'red'}>{asset.growPercent}%</Tag>}
                                    {item.isPlain && item.value}
                                    {!item.isPlain && (
                                        <Typography.Text
                                            type={asset.grow ? 'success' : 'danger'}
                                        >
                                            {item.value}
                                        </Typography.Text>
                                    )}
                                </span>
                            </List.Item>
                        )}
                    />
                </Card>
            ))}
        </Layout.Sider>
    )
}