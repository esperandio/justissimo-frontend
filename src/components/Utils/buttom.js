import { ButtonBootstrapCustom } from '../Style/buttomStyled';

function ButtonOutlined(props) {
    return(
        <ButtonBootstrapCustom
            className={props.className}
            type={props.type}
            variant={props.variant}
            onClick={props.onClick}
        >
            {props.internal}
        </ButtonBootstrapCustom>
    );
}

export default ButtonOutlined;
