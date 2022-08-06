import Header from '@/layouts/components/Header/Header';

function HeaderOnly({ children }) {
    return (
        <>
            <div className="container">
                <Header />
                <div className="content">{children}</div>
            </div>
        </>
    );
}

export default HeaderOnly;
