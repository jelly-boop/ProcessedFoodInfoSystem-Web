import React, { useEffect, useState } from 'react';
import { Button, Card, CardText, Col, Container, Row, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { getUserAllergyInfo, getUserInfoApi, getUserSummary } from '../../api';
import './MyPageStyle.scss';
import UserReviews from './UserReviews';
import {AiOutlineUser,AiOutlineStar} from 'react-icons/ai';
import {HiOutlinePencilAlt} from 'react-icons/hi';
import { AiOutlineFilter } from 'react-icons/ai';

const MyPage = () => {
  const [data, setData] = useState([]);
  const [writtenData, setWrittenData] = useState(null);
  const [allergyLoading, setAllergyLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toggleReview, setToggleReview] = useState(false);

  const [favouriteCount, setFavouriteCount] = useState('');
  const [reviewCount, setReviewCount] = useState('');
  const [userName, setUserName] = useState('');
  const [userInfo, setUserInfo] = useState({
    name: null,
    address: null,
    birth: null,
  });

  const { name, address, birth } = userInfo;

  const getUSerInfo = async () => {
    await getUserInfoApi.gerUserInfo().then(res => {
      console.log(res.data);
      setUserInfo(
        {
          name: res.data.name,
          address: res.data.address,
          birth: res.data.birth,
        },
      );
    }).catch(e => {
      console.log('유저 정보 에러', e.response);
    });
  };


  useEffect(() => {
    const gogogetAllergy = async () => {
      setAllergyLoading(true);
      await getUserAllergyInfo
        .userAllergies()
        .then((response) => {
          const result = response.data.userAllergyMaterials;
          setData(result);
          setAllergyLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const gogogetSummary = async () => {
      setUserLoading(true);
      await getUserSummary
        .userSummary()
        .then((response) => {
          setUserLoading(false);
          setFavouriteCount(response.data.favorite_count);
          setReviewCount(response.data.review_count);
          setUserName(response.data.user_name);
          const { userSummary } = [favouriteCount, reviewCount, userName];
          setWrittenData({ userSummary });
        })
        .catch((error) => {
          console.log(error);
        });
    };
    gogogetAllergy();
    gogogetSummary();
    getUSerInfo();
  }, []);

  const onclickReview = () => {
    setToggleReview(prevState => (!prevState));
  };


  if (userLoading || allergyLoading) return null;

  return (
   <div className="myPage__container">
     <div className="myPage__menu">
        <div className="myPage__title">
            MyPage
        </div>
        <div className="menu__items">
           <Link to='/changeUserInfo' className="menu__item">        
                내 정보변경하기         
            </Link>
             <Link to='/userAllergyInfo' className="menu__item">            
                알러지 정보 변경하기
            </Link>
              <Link to='/changePassword' className="menu__item">           
                비밀번호 변경하기
            </Link>
             <Link to='/secondEmail' className="menu__item">
                2차 보안 설정하기
            </Link>
        </div>
     </div>
     <div className="myPage__info">
       <button className="info__box">
         <AiOutlineUser size="100" className="box__icon"/>
         <div className="box__title">{name}</div>
         <div className="box__des">{birth}</div>
         <div className="box__des">{address}</div>
       </button>
       <button className="info__box">
         <AiOutlineStar size="100" className="box__icon"/>
         <div className="box__title"> {favouriteCount}</div>
         <div className="box__des">즐겨찾기</div>
       </button>
       <button className="info__box">
         <HiOutlinePencilAlt size="100" className="box__icon"/>
         <div className="box__title">{reviewCount}</div>
         <div className="box__des" onClick={onclickReview}>리뷰</div>
          {toggleReview && <UserReviews />}
       </button>
       <button className="info__box">
         <AiOutlineFilter size="100" className="box__icon"/>
         <div className="box__title">{data.length}</div>
         <div className="box__des">알러지</div>
       </button>
     </div>
   </div>
  );
};

export default React.memo(MyPage);
