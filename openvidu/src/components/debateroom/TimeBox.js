import styled from "styled-components";
import { useState, useEffect } from "react";
// components
import DebateButton from "./DebateButton";
import CardInputButton from "./CardInputButton";
// mui
import Grid from "@mui/material/Grid";

// recoil
import { useRecoilState, useRecoilValue } from "recoil";
import { isReadyState, isStartState, isAllReadyState, roleState, CardNumState } from "../stores/atoms";


function TimeBox() {
  // state
  const cardNum = useRecoilValue(CardNumState);

  // recoil state
  const [isReady, setIsReady] = useRecoilState(isReadyState);
  const [isStart, setIsStart] = useRecoilState(isStartState);
  const [isAllReady, setISAllReady] = useRecoilState(isAllReadyState);
  const [role, setRole] = useRecoilState(roleState);

  // toggle ready state
  const toggleReady = () => {
    setIsReady(true);
  }

  // toggle start state
  const toggleStart = () => {
    setIsStart(true);
  }

  // set default value;
  useEffect(() => {
    setIsStart(false);
    setIsReady(false);
    // temporarily set user as a "DEBATER"
    setRole("master");
  
    return(() => {
      setIsReady(false);
      setIsStart(false);
    })
  },[])

  // function to detect start state
  useEffect(() => {
    console.log(isStart);
  }, [isStart])

  return(
    <Wrapper>
      <AreaDiv>
        <Grid container spacing={0}>
          <Grid item xs={8}>
            <CardInputButton />
          </Grid>
          <Grid item xs={4}>
            <CardNumDiv>
              <TitleDiv>
                카드 등록
              </TitleDiv>
              <div>
                {cardNum}/2장
              </div>
              <DebateButton
                className={(role==="debater") ? (!isReady?"readyButton-root" : "disableButton-root") : "startButton-root"}
                onClick={(role==="debater")?toggleReady:toggleStart}
              >
                {(role==="debater") ? "준비 완료": "토론 시작"}
              </DebateButton>
            </CardNumDiv>
          </Grid>
          <Grid item xs={12}>
            <SubText>
              최대 2개까지 카드(이미지 자료)를 등록할 수 있습니다
            </SubText>
          </Grid>
        </Grid>
      </AreaDiv>
    </Wrapper>
  )
}

export default TimeBox

const AreaDiv = styled.div`
  width: 100%;
  height: 200px;
  box-shadow: 1px 1px 3px #777777, -1px -1px 1px #eeeeee;
  border-radius: 12px;

  margin-top: 10px;
`

const Wrapper = styled.div`
`

const CardNumDiv = styled.div`
  // font
  font-size: 20px;
  font-weight: bold;
  color: #777777;
  letter-spacing: -1px;

  // positioning
  display: flex;
  flex-direction: column;
  align-items: center;

  // margin & padding
  margin-top: 25px;
  margin-right: 10px;
  line-height: 150%
`

const SubText = styled.div`
  // font
  font-size: 15px;
  color: #777777;

  // positioning
  text-align: center;

  // margin
  margin-top: 20px;
`

const TitleDiv = styled.div`
  // font
  font-size: 24px;
  font-weight: bold;
  color: #444444;

  // positioning
  text-align: center;

  // margin
  margin-top: 10px;
`