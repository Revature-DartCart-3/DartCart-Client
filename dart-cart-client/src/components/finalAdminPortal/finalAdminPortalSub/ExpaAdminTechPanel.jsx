import React, {useEffect} from 'react';
import {Container} from "react-bootstrap";
import {Table} from "react-bootstrap";

const ExpaAdminTechPanel = () => {

    const [enterChat, setEnterChat] = useState('');
    const [deleteChat, setDeleteChat] = useState('');

    useEffect(() => {

    }, [])









    return (
        <>
            <h1>Chat Queue</h1>

            <section>
                <Container>
                    <Table>
                       <thead>
                        <tr>
                            <th>Enter</th>
                            <th>User</th>
                            <th>Session</th>
                            <th>Tech</th>
                            <th>Delete</th>
                        </tr>
                       </thead>

                        {/**/}
                        <tbody>
                            <tr>
                                <td></td>
                            </tr>
                        </tbody>

                    </Table>


                </Container>
            </section>



        </>
    );
};

export default ExpaAdminTechPanel;