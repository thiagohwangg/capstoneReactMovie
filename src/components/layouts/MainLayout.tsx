import { Footer, Header } from "components";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

export const MainLayout = () => {
    return (
        <main>
            <Header />
            <MainWrapper  id="main-content">
                <Outlet />
            </MainWrapper>
            <Footer />
        </main>
    );
};


const MainWrapper = styled.div`
    max-width:  var(--max-width);
    margin : auto ;
`