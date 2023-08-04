import React from 'react'
import { Row, Col } from 'react-bootstrap'
// import products from '../products'
import { Product } from '../components/Product'
import { useGetProductsQuery } from '../slices/productApiSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'


const HomeScreen = () => {

    const { data: products, isLoading, isError } = useGetProductsQuery();
    return (
        <>
            {
                
                isLoading ? (<h2><Loader /></h2>) :
                    isError ? (<Message variant='danger' children={isError?.data?.message || isError?.error}></Message>) :
                        <>
                            <h1>Latest Products</h1>
                            <Row>
                                {products.map((product) => (
                                    <Col key={product._id} xs={12} md={6} lg={4} xl={3}>
                                        <Product product={product} />
                                    </Col>
                                ))}
                            </Row>
                        </>
            }
        </>
    )
}

export default HomeScreen