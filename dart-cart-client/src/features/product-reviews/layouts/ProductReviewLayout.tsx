import React, { useState, useEffect, useRef, lazy } from 'react'
import { Col, Row, Container, Image, Form, Button } from "react-bootstrap";
import ProductReview from '../ProductReview'
// import MiscTableOne from '../misc/MiscTableOne';
// import ReactIcon from '../misc/ReactIcon';
// import ProductPurchaseCard from '../product-purchase-card/ProductPurchaseCard';
// import ProductReviewCard from "../product-review-card/ProductReviewCard"
// import ProductImages from '../ProductImages';
// import ProductReviewDetail from '../ProductReviewDetail';

function ProductReviewLayout() {
    const layoutRef = useRef()
    const [formData, setFormData] = useState({ layoutSections: "" })
    const [sections, setSections] = useState([
        { title: "", fluid: true, cols: ["z"], featureTypesArry: ['a'] },
    ])
    const [showLayoutControls, setLayoutControls] = useState(false)

    const components = {
        "ProductReviewCard": require('../product-review-card/ProductReviewCard').default,
        "ProductImages": require('../ProductImages').default,
        "MiscTableOne": require('../misc/MiscTableOne').default,
        "MiscTableTwo": require('../misc/MiscTableTwo').default,
        "ProductReviewDetail": require('../ProductReviewDetail').default,
        "ProductPurchaseCard": require('../product-purchase-card/ProductPurchaseCard').default,
        "ReactIcon": require('../misc/ReactIcon').default,
        "ReviewCrousel": require('../misc/ReviewCrousel').default,
        "ProductCrousel": require('../misc/ProductCrousel').default,
        "AggrigateRating": require('../misc/AggrigateRating').default,
    };

    // const components2 = [
    //     { "name": "ProductReviewCard", "path": "../product-review-card/ProductReviewCard" },
    //     // { "name": "ProductImages", "path": "../ProductImages" },
    //     // { "name": "MiscTableOne", "path": "../misc/MiscTableOne" },
    //     // { "name": "ProductReviewDetail", "path": "../ProductReviewDetail" },
    //     // { "name": "ProductPurchaseCard", "path": "../product-purchase-card/ProductPurchaseCard" },
    //     // { "name": "ReactIcon", "path": "../misc/ReactIcon" }
    // ].reduce((res, e) => {
    //     return { [e.name]: require(e.path).default }
    //     // return { ["ProductReviewCard"]: require('../product-review-card/ProductReviewCard').default }
    // }, {})


    // const components2 = [
    //     { "name": "ProductReviewCard", "path": "../product-review-card/ProductReviewCard" },
    //     { "name": "ProductImages", "path": "../ProductImages" },
    //     { "name": "MiscTableOne", "path": "../misc/MiscTableOne" },
    //     { "name": "ProductReviewDetail", "path": "../ProductReviewDetail" },
    //     { "name": "ProductPurchaseCard", "path": "../product-purchase-card/ProductPurchaseCard" },
    //     { "name": "ReactIcon", "path": "../misc/ReactIcon" }
    // ].reduce((acc, curr, i) => acc[curr.name] = `${curr.path}`, {});

    // console.log('components2: ', components2)

    // const components = {
    //     "ProductReviewCard": ProductReviewCard,
    //     "ProductImages": ProductImages,
    //     "MiscTableOne": MiscTableOne,
    //     "ProductReviewDetail": ProductReviewDetail,
    //     "ProductPurchaseCard": ProductPurchaseCard,
    //     "ReactIcon": ReactIcon
    // };


    const jsonData = [
        {
            code: "a",
            componentType: "AggrigateRating",
            props: {
                title: "zero"
            },
        },
        {
            code: "0",
            componentType: "ProductReviewCard",
            props: {
                title: "zero"
            },
        },
        {
            code: "i",
            componentType: "ProductImages",
            // props: {
            //     title: "one"
            // },
        },
        {
            code: "1",
            componentType: "ProductReviewCard",
            props: {
                title: "Horrible! One star",
                rating: 1
            },
        },
        {
            code: "2",
            componentType: "ProductReviewCard",
            props: {
                title: "Not that good. Two stars",
                rating: 2
            },
        },
        {
            code: "3",
            componentType: "ProductReviewCard",
            props: {
                title: "It's ok. Three stars",
                rating: 3
            },
        },
        {
            code: "4",
            componentType: "ProductReviewCard",
            props: {
                title: "Really like it! Four Stars",
                rating: 4
            },
        },
        {
            code: "5",
            componentType: "ProductReviewCard",
            props: {
                title: "I Love It! Five Stars",
                rating: 5
            },
        },
        {
            code: "t",
            componentType: "MiscTableOne",
            props: {
                title: "T"
            },
        },
        {
            code: "s",
            componentType: "MiscTableTwo",
            props: {
                title: "T"
            },
        },
        {
            code: "p",
            componentType: "ProductPurchaseCard",
            props: {
                title: "FREE devlivery"
            },
        },
        {
            code: "c",
            componentType: "ProductReviewDetail",
            props: {
                title: "FREE devlivery"
            },
        },
        {
            code: "r",
            componentType: "ReactIcon",

        },
        {
            code: "l",
            componentType: "ReviewCrousel",

        },
        {
            code: "k",
            componentType: "ProductCrousel",
            props: {
                cols: [3, 3, 3, 3]
            },

        },
        {
            code: "j",
            componentType: "ProductCrousel",
            props: {
                cols: [4, 4, 4]
            },

        }
    ]

    const dLayoutData = [
        {
            title: "Product Reviews",
            fluid: true,
            cols: ["a"],
            featureTypesArry: ['l']
        },
        {
            title: "Stories",
            fluid: false,
            cols: ["4", "4", "4", "4", "4", "4", "4", "4", "4"],
            featureTypesArry: ['i', 'i', 'i', '5', '4', '3', 'c', 'c', 'c']
        },
        {
            title: "Product Reviews",
            fluid: true,
            cols: ["z", "z"],
            featureTypesArry: ['k', 'j']
        },
        {
            title: "Stories",
            fluid: false,
            cols: ["8", "4", "4", "8", "8", "4", "4", "8"],
            featureTypesArry: ['5', 'i', 'i', '5', '5', 'i', 'i', '5']
        },
        {
            title: "Featured Review",
            fluid: false,
            cols: ["z", "4", "5", "3", "4", "5", "3"],
            featureTypesArry: ['i', 's', '5', 'p', 't', '5', 'p']
        },
        {
            title: "Featured Review",
            fluid: false,
            cols: ["4", "5", "3", "4", "5", "3", "4", "5", "3", "4", "5", "3"],
            featureTypesArry: ['i', '5', 'p', 'i', '5', 'p', 'i', '5', 'p', 'i', '5', 'p']
        },
        {
            title: "Featured Review",
            fluid: false,
            cols: ["3", "6", "3", "3", "6", "3", "3", "6", "3", "3", "6", "3"],
            featureTypesArry: ['i', '5', 'p', 'i', '5', 'p', 'i', '5', 'p', 'i', '5', 'p']
        },
        {
            title: "Reviews",
            fluid: false,
            cols: ["4", "5", "3", "4", "5", "3"],
            featureTypesArry: ['i', '5', 'p', 's', 't', 'c']
        },
        {
            title: "Stories",
            fluid: true,
            cols: ["3", "3", "3", "3", "3", "3", "3", "3", "3", "3", "3", "3"],
            featureTypesArry: ['i', 'i', 'i', 'i', '5', '4', '3', '2']
        },
        {
            title: "Stories",
            fluid: false,
            cols: ["6", "6", "6", "6", "6", "6"],
            featureTypesArry: ['5', 'i', 'i', '5', '5', 'i', 'i', '5']
        },
        {
            title: "Stories",
            fluid: false,
            cols: ["6", "6", "6", "6", "6", "6"],
            featureTypesArry: ['5', 'r', 'r', '5', '5', 'r', 'r', '5']
        },
        // {
        //     title: "Stories",
        //     fluid: true,
        //     cols: ["8", "4", "4", "8", "8", "4", "4", "8"],
        //     featureTypesArry: ['5', 'i', 'i', '5', '5', 'i', 'i', '5']
        // }
    ]

    useEffect(() => {
        console.log(showLayoutControls)
        console.log('sections: ', sections)
    }, [sections, showLayoutControls])

    useEffect(() => {
        console.log('formData: ', formData)
        setSections(formData.layoutSections.split("").map((e, i) => i < sections.length ? e === "1" ? {
            ...sections[i],
            fluid: true,
            title: sections[i].title,
            cols: sections[i].cols,
            featureTypesArry: sections[i].featureTypesArry
        } :
            {
                ...sections[i],
                fluid: false,
                title: sections[i].title,
                cols: sections[i].cols,
                featureTypesArry: sections[i].featureTypesArry
            } : {
            ...sections[i],
            fluid: false,
            title: "Section",
            cols: ["z", "4", "5", "3"],
            featureTypesArry: ['i', 't', '5', 'p']
        }))
    }, [formData])

    const handleChange = (e) => {
        const layoutString = e.target.value;
        console.log(layoutString)
        if (e.target.name === 'layoutSections') {
            setFormData({ ...formData, [e.target.name]: e.target.value })
        } else {
            setLayoutControls(e.target.checked)
        }
    }

    const loadLayouts = () => {
        console.log('loadLayouts')
        console.log('dLayoutData: ', dLayoutData)
        setSections(dLayoutData)
        // setSections(dLayoutData.sections.map(e => { return { title: "", fluid: e.section, cols: e.cols.map(e => e), featureTypesArry: e.featureTypesArry.map(e => e) } }))
    }


    useEffect(() => {
        // console.log(showLayoutControls)
        // console.log(sections)
        // setSections(dLayoutData)
        loadLayouts()
    }, [])
    return (
        <>
            <Form.Group id="fg-1" className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" checked={showLayoutControls}
                    onChange={e => handleChange(e)}
                    label="Set Layout" />
            </Form.Group>
            {
                showLayoutControls && <Form>
                    <Button onClick={loadLayouts}>LoadLayouts</Button>
                    <fieldset >
                        <Form.Group id="fg-2" className="mb-3">
                            {/* <Form.Label htmlFor="disabledTextInput">Layout input</Form.Label> */}
                            <Form.Control name="layoutSections" value={formData.layoutSections} id="disabledTextInput" placeholder="Disabled input" onChange={e => handleChange(e)} />
                        </Form.Group>
                    </fieldset>
                </Form>
            }
            {sections.map((e, i) => <div key={`div-${i}`}>
                <section key={`prl-sec-${i}`} style={{ backgroundColor: 'whitesmoke', padding: '25px', marginBottom: '25px' }}>
                    <h1 key={`prl-sec-h1-${i}`}>{e.title}</h1>
                </section>
                <ProductReview key={`prl-${i}`} showLayoutControls={showLayoutControls}
                    components={components}
                    jsonData={jsonData}
                    cols={e.cols}
                    featureTypesArry={e.featureTypesArry}
                    fluid={e.fluid} />
            </div>)}
        </>
    )
}

export default ProductReviewLayout