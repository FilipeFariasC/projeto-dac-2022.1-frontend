


const Container = (props)=>{
    
    return (
        <div className={`container container-fluid ${props.className}`}>
            {props.children}
        </div>
    );
}

export {Container};

export default Container;
