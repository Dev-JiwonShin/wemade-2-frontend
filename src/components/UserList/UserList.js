// // src/components/UserList/UserList.js
import React, {useCallback, useEffect, useState} from 'react';
import {FixedSizeList as List} from 'react-window';
import UserListItem from './UserListItem';
import {useSelector, useDispatch} from 'react-redux';
import {fetchMoreUsersAction} from '../../redux/actions/userActions';
import {Spin} from 'antd';

function UserList() {
    const dispatch = useDispatch();
    const {users, loading} = useSelector(state => state.user);
    const [listHeight, setListHeight] = useState(window.innerHeight - 100); // 초기 높이 설정, 여백을 위해 100을 뺌

    useEffect(() => {
        // 초기 데이터 로딩
        if (users.length === 0 && !loading) {
            dispatch(fetchMoreUsersAction(0));
        }

        // 윈도우 크기 변경 시 리스트 높이 업데이트
        const updateSize = () => {
            setListHeight(window.innerHeight - 100); // 상단 및 하단 여백을 고려한 높이 조정
        };
        window.addEventListener('resize', updateSize);

        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        return () => window.removeEventListener('resize', updateSize);
    }, [dispatch, loading, users.length]);

    // 가상 리스트 항목 렌더링
    const Row = ({index, style}) => (
        <UserListItem user={users[index]} style={style}/>
    );

    // 현재 렌더링된 항목들의 범위를 감지하고, 끝에 도달했을 때 추가 데이터를 불러오는 함수
    const handleItemsRendered = useCallback(({visibleStopIndex}) => {
        if (!loading && visibleStopIndex + 10 >= users.length) {
            dispatch(fetchMoreUsersAction(users.length));
        }
    }, [dispatch, loading, users.length]);

    return (
        <div style={{position: 'relative', height: `${listHeight}px`}}>
            <List
                height={listHeight}
                itemCount={users.length}
                itemSize={100}
                width={'100%'}
                onItemsRendered={handleItemsRendered}
            >
                {Row}
            </List>
            {loading && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'rgba(255, 255, 255, 0.8)' // 약간의 투명도를 줘서 리스트 내용이 비치게 함
                }}>
                    <Spin size="large"/>
                </div>
            )}
        </div>
    );
}

export default UserList;