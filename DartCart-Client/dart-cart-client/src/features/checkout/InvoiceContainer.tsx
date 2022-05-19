import React from "react"
import "./InvoiceContainer.css"

export function DisplayInvoice() {
    return (
        <>
            <div className="container bootdey">
            <div className="row">
                    <div className="col-sm-10 col-sm-offset-1">
                        <div className="widget-box">
                            <div className="widget-header widget-header-large">
                                <h3 className="widget-title grey lighter">
                                    <i className="ace-icon fa fa-leaf green"></i>
                                    Bootdey receipt
                                </h3>

                                <div className="widget-toolbar no-border invoice-info">
                                    <span className="invoice-info-label">Date:</span>
                                    <span className="blue">04/04/2014</span>
                                </div>

                                <div className="widget-toolbar hidden-480">
                                    <a href="#">
                                        <i className="ace-icon fa fa-print"></i>
                                    </a>
                                </div>
                            </div>

                            <div className="widget-body">
                                <div className="widget-main padding-24">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="row">
                                                <div className="col-xs-11 label label-lg label-info arrowed-in arrowed-right">
                                                    <b>Company Info</b>
                                                </div>
                                            </div>

                                            <div>
                                                <ul className="list-unstyled spaced">
                                                    <li>
                                                        <i className="ace-icon fa fa-caret-right blue"></i>Street, City
                                                    </li>

                                                    <li>
                                                        <i className="ace-icon fa fa-caret-right blue"></i>Zip Code
                                                    </li>

                                                    <li>
                                                        <i className="ace-icon fa fa-caret-right blue"></i>State, Country
                                                    </li>

                                                    <li>
                                                        <i className="ace-icon fa fa-caret-right blue"></i>
                                                        Phone: <b className="red">111-111-111</b>
                                                    </li>

                                                    <li className="divider"></li>

                                                    <li>
                                                        <i className="ace-icon fa fa-caret-right blue"></i>
                                                        Paymant Info
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="col-sm-6">
                                            <div className="row">
                                                <div className="col-xs-11 label label-lg label-success arrowed-in arrowed-right">
                                                    <b>Customer Info</b>
                                                </div>
                                            </div>

                                            <div>
                                                <ul className="list-unstyled  spaced">
                                                    <li>
                                                        <i className="ace-icon fa fa-caret-right green"></i>Street, City
                                                    </li>

                                                    <li>
                                                        <i className="ace-icon fa fa-caret-right green"></i>Zip Code
                                                    </li>

                                                    <li>
                                                        <i className="ace-icon fa fa-caret-right green"></i>State, Country
                                                    </li>

                                                    <li className="divider"></li>

                                                    <li>
                                                        <i className="ace-icon fa fa-caret-right green"></i>
                                                        Contact Info
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space"></div>

                                    <div>
                                        <table className="table table-striped table-bordered">
                                            <thead>
                                                <tr>
                                                    <th className="center">#</th>
                                                    <th>Product</th>
                                                    <th className="hidden-xs">Quantity</th>
                                                    <th className="hidden-480">Discount</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                <tr>
                                                    <td className="center">1</td>

                                                    <td>
                                                        <a href="#">google.com</a>
                                                    </td>
                                                    <td className="hidden-xs">
                                                        5
                                                    </td>
                                                    <td className="hidden-480"> --- </td>
                                                    <td>$10</td>
                                                </tr>

                                                <tr>
                                                    <td className="center">2</td>

                                                    <td>
                                                        <a href="#">yahoo.com</a>
                                                    </td>
                                                    <td className="hidden-xs">
                                                        3
                                                    </td>
                                                    <td className="hidden-480"> 5% </td>
                                                    <td>$45</td>
                                                </tr>

                                                <tr>
                                                    <td className="center">3</td>
                                                    <td>Hosting</td>
                                                    <td className="hidden-xs"> 7 </td>
                                                    <td className="hidden-480"> 10% </td>
                                                    <td>$90</td>
                                                </tr>

                                                <tr>
                                                    <td className="center">4</td>
                                                    <td>Design</td>
                                                    <td className="hidden-xs"> 1 </td>
                                                    <td className="hidden-480"> 50% </td>
                                                    <td>$250</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="hr hr8 hr-double hr-dotted"></div>

                                    <div className="row">
                                        <div className="col-sm-5 pull-right">
                                            <h4 className="pull-right">
                                                Total amount :
                                                <span className="red">$395</span>
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}