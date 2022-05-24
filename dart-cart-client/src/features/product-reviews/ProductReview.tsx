import React, { useState, useEffect, lazy } from 'react'
import { Col, Row, Container, Image, Form } from "react-bootstrap";
import DLayout from './DLayout';

function ProductReview(props) {

    const res = props.jsonData.reduce((acc, curr, i) => (acc[curr.code] = React.createElement(props.components[props.jsonData[i].componentType], props.jsonData[i].props), acc), {});

    const [formData, setFormData] = useState({ layoutCols: "", feature_types: "" })

    const [featureTypes, setFeatureTypes] = useState({
        // 1: <ProductReviewCard title={"Hello"} />,
        // 2: <ProductReviewCard />,
        // 3: <ProductImages />,
        // 4: <MiscTableOne />,
        // 5: <ProductReviewDetail />
    })

    const [features, setFeatures] = useState([])
    const [featureTypesArry, setFeatureTypesArry] = useState([]);
    const [cols, setCols] = useState([])

    useEffect(() => {

        console.log('useEffect, res: ', res)
        setFeatureTypes(res)

        console.log('useEffect[] featureTypesArry: ', featureTypesArry)
        console.log('useEffect[] cols: ', cols)

        setFeatureTypesArry(props.featureTypesArry)
        setCols(props.cols)

    }, [])


    useEffect(() => {
        setFeatures(featureTypesArry.map(e => featureTypes[e]))
    }, [featureTypesArry])

    useEffect(() => {
        console.log('useEffect formData: ', formData)
    }, [formData])

    const handleChange = (e) => {
        const layoutString = e.target.value;
        console.log(layoutString)
        setFormData({ ...formData, [e.target.name]: e.target.value })
        e.target.name === 'layoutCols' ? setCols(layoutString.split(":")) : setFeatureTypesArry(layoutString.split(":"))
    }

    const handleLayoutColsFeatureTypes = (e) => {
        const layoutString = e.target.value;
        console.log("handleLayoutColsFeatureTypes: ", layoutString)
        const [layoutCols, feature_types] = layoutString.split("-")

        setFormData({ ...formData, "layoutCols": layoutCols, "feature_types": feature_types  })

        setCols(layoutCols.split(":"))
        setFeatureTypesArry(feature_types.split(":"))
    }
    return (<>
        {props.showLayoutControls && <Form >
            <fieldset >
                <Form.Group className="mb-3">
                    {/* <Form.Label htmlFor="disabledTextInput">Layout input</Form.Label> */}

                    <Form.Select name="layoutColsFeature_types"  id="layoutColsFeature_types" placeholder="Disabled input" onChange={e => handleLayoutColsFeatureTypes(e)} >
                        <option >Select Preset</option>
                        {props.dLayoutData.map(e => {
                            return (<option value={`${e.cols.join(':')}-${e.featureTypesArry.join(':')}`}>{`${e.title}`}</option>)
                        })}
                    </Form.Select>
                    {/* <Form.Control name="layoutCols" value={formData.layoutCols} id="disabledTextInput" placeholder="Disabled input" onChange={e => handleChange(e)} /> */}
                </Form.Group>
                <Form.Group className="mb-3">
                    {/* <Form.Label htmlFor="disabledTextInput">Layout input</Form.Label> */}

                    {/* <Form.Select name="layoutCols" value={formData.layoutCols} id="layoutCols" placeholder="Disabled input" onChange={e => handleChange(e)} >
                        <option value={`z`}>12 Col</option>
                        <option value={`453453453453`}>453453453453</option>
                        <option value={`363363363363`}>363363363363</option>
                        <option value={`66666666666`}>66666666666</option>
                        <option value={`488448844884`}>488448844884</option>
                        <option value={`33333333`}>33333333</option>
                        <option value={`444444444444`}>444444444444</option>
                    </Form.Select> */}
                    <Form.Control name="layoutCols" value={formData.layoutCols} id="disabledTextInput" placeholder="Disabled input" onChange={e => handleChange(e)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    {/* <Form.Label htmlFor="disabledTextInput">Layout input</Form.Label> */}
                    {/* <Form.Select name="feature_types" value={formData.feature_types} id="feature_types" placeholder="Disabled input" onChange={e => handleChange(e)} >
                        <option value={`l`}>Carousel</option>
                        <option value={`i5pi4pi3p`}>i5pi4pi3p</option>
                        <option value={`i54ii32i`}>i54ii32i</option>
                        <option value={`iiii5432`}>iiii5432</option>
                        <option value={`iii543iii543`}>iii543iii543</option>
                    </Form.Select> */}
                    <Form.Control name="feature_types" value={formData.feature_types} id="disabledTextInput" placeholder="Disabled input" onChange={e => handleChange(e)} />
                </Form.Group>

            </fieldset>
        </Form>}
        <Container fluid={props.fluid}
        // style={{ backgroundColor: 'white', padding: '25px', marginBottom: '25px' }}
        >
            <DLayout cols={cols} features={features} dname={"section1"} />
        </Container>
    </>
    )
}

export default ProductReview