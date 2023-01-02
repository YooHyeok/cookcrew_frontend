import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {useContext} from 'react';
import { DietDesciprtContext } from './DietScheduler';

export default function DietDescriptModal() {
    const context = useContext(DietDesciprtContext);
    const modalStyle = { 
        width: "700px"
        , position: "fixed"
        , top: "50%"
        , left: "50%"
        , transform: "translate(15%,-70%)"
    }

    return(
        <div>
        <Modal isOpen={context.descriptShow} toggle={context.descriptToggle} style={modalStyle}>
          <ModalHeader toggle={context.descriptToggle}>식단 관리 및 챌린지 랭킹 상세설명</ModalHeader>
          <ModalBody>
            챌린지 참여 여부에 따라 챌린지 랭킹에 등제됩니다.<br/>
            랭킹 산정은 매주 토요일 자정마다 주간으로 업데이트 되므로 <br/>
            챌린지 참여에 동의하지 않을 경우 토요일 11시 59분 전까지만 <br/>
            수정 가능 합니다. <br/>
            <br/>
            달성여부는 사용자가 지정한 목표칼로리 대비 칼로리 총 합이<br/>
            일치할 경우 사용자가 직접 체크하는 방식으로 운영되고 있으나,<br/>
            추후 산정 범위 내 포함될 경우 달성 여부를 자동으로 계산하도록 서비스할 예정입니다.<br/>
            <br/>
            랭킹 산정 달성률 백분위 계산 식은 아래와 같습니다. <br/><br/>
            식단구분 : 아침, 점심, 저녁 <br/>
            총 달성수 : 21 (식단구분 * 1주일) <br/>
            백분위 계산식 : 식단 구분별 달성여부 수 / 총 달성 수 X 100<br/>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={context.descriptToggle}>닫기</Button>
          </ModalFooter>
        </Modal>
        </div>
    )
}