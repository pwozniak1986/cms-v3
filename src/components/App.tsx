import AuthProvider from "hoc/auth-provider/AuthProvider";
import Layout from "components/layout/Layout"
import { Routes, Route, Link } from "react-router-dom";
import Edit from 'components/pages/Edit'
import Publish from "./pages/Publish";
import Schedule from "./pages/Schedule";
import Files from "./pages/Files";


export default function App(){
    return(
        <AuthProvider>
            <Layout>
                <Routes>
                    <Route element={<div>landing page</div>} path="/" />
                    <Route path=":sectionId">
                        <Route path="edit">
                            <Route element={<Edit/>} path=":screenId"/>
                        </Route>
                        <Route element={<Publish/>} path="publish"/>
                        <Route element={<Schedule/>} path="schedule"/>
                        <Route element={<Files/>} path="files"/>
                    </Route>
                    <Route element={<Files/>} path="files"/>
                    <Route element={<Edit/>} path="data"/>
                    <Route element={<div>not found</div>} path="*" />
                </Routes>
            </Layout>
        </AuthProvider>
    )
}


