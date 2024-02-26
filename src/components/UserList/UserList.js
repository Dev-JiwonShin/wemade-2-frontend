// // src/components/UserList/UserList.js
// src/components/UserList/UserList.js
import React, { useCallback, useEffect, useState } from 'react';
import { FixedSizeList as List } from 'react-window';
import UserListItem from './UserListItem';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMoreUsersAction, resetUsersAction } from '../../redux/actions/userActions';
import { Button, Spin } from 'antd';

function UserList({ sortOrder, setSortOrder }) {
    const dispatch = useDispatch();
    const { users, loading } = useSelector(state => state.user);
    const [listHeight, setListHeight] = useState(window.innerHeight - 100);

    useEffect(() => {
        // 컴포넌트 마운트 시 오름차순으로 초기 사용자 목록 불러오기
        dispatch(fetchMoreUsersAction(0, sortOrder));

        const updateSize = () => {
            setListHeight(window.innerHeight - 100);
        };
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, [dispatch, sortOrder]); // sortOrder를 의존성 배열에 추가하여 정렬 순서가 변경될 때마다 데이터를 다시 불러옴

    const handleSortOrderChange = (order) => {
        setSortOrder(order);
        dispatch(resetUsersAction()); // 사용자 목록 초기화
        dispatch(fetchMoreUsersAction(0, order)); // 선택된 정렬 순서에 따라 사용자 목록 다시 불러오기
    };

    const Row = ({ index, style }) => (
        <UserListItem user={users[index]} style={style} />
    );

    const handleItemsRendered = useCallback(({ visibleStopIndex }) => {
        if (!loading && visibleStopIndex + 10 >= users.length) {
            dispatch(fetchMoreUsersAction(users.length, sortOrder));
        }
    }, [dispatch, loading, users.length, sortOrder]);

    return (
        <div style={{ position: 'relative', height: `${listHeight}px` }}>
            <Button
                onClick={() => handleSortOrderChange('asc')}
                style={{ margin: 5 }}
                type={sortOrder === 'asc' ? 'primary' : 'default'} // 오름차순 선택 시 색깔 변경
            >
                오름차순
            </Button>
            <Button
                onClick={() => handleSortOrderChange('desc')}
                style={{ margin: 5 }}
                type={sortOrder === 'desc' ? 'primary' : 'default'} // 내림차순 선택 시 색깔 변경
            >
                내림차순
            </Button>
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
                <Spin size="large" style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 10,
                }} />
            )}
        </div>
    );
}

export default UserList;
