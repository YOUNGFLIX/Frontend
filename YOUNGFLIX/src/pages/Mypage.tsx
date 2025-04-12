import React, { useEffect, useState } from 'react'
import { getMyInfo, putMyInfo } from '../apis/auth';

const Mypage = () => {
    const [data, setData] = useState({
        name: '',
        nickname: '',
        email: '',
        avatar: ''
    });

    useEffect (() => {
        const getData = async () => {
            const response = await getMyInfo();
            console.log(response);

            setData(response.data);
        };

        getData();
    }, []);

    const handleSave = async () => {
        try {
            const response = await putMyInfo(data);
            console.log(response); 
            alert("저장되었습니다.");
        } catch (error) {
            alert("저장 중 오류가 발생했습니다.");
            console.error(error);
        }
    };
  
    return (
      <div className="bg-black min-h-screen flex justify-center items-center text-white font-sans px-4 py-8">
        <div className="w-full max-w-xl bg-[#181818] rounded-xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold mb-8 text-center">프로필 관리</h2>

          <div className="flex justify-center mb-6 relative">
            <div className="w-24 h-24 rounded-full bg-gray-600 flex items-center justify-center relative overflow-hidden">
              <img
                src={data.avatar ? data.avatar : 'https://www.gravatar.com/avatar/?d=mp'}
                alt="avatar"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 right-0 bg-black bg-opacity-60 p-1 rounded-full">
              </div>
            </div>
          </div>

          <label className="block mb-2 text-sm font-semibold">이름</label>
          <input type="text" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} className="w-full p-3 mb-4 rounded-md bg-gray-700 text-white placeholder-gray-300" />

          <label className="block mb-2 text-sm font-semibold">닉네임</label>
          <input type="text" value={data.nickname} onChange={(e) => setData({ ...data, nickname: e.target.value })} className="w-full p-3 mb-4 rounded-md bg-gray-700 text-white placeholder-gray-300" />

          <label className="block mb-2 text-sm font-semibold">이메일</label>
          <input type="text" value={data.email} readOnly className="w-full p-3 mb-8 rounded-md bg-gray-700 text-white placeholder-gray-300" />

          <div className="flex gap-4">
            <button
              className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-md font-semibold shadow-md hover:from-red-700 hover:to-red-800 hover:shadow-lg transition-all duration-300"
              onClick={handleSave}
            >
              저장
            </button>
            <button className="flex-1 border border-gray-500 text-white py-3 rounded-md font-semibold hover:bg-gray-800 hover:text-gray-200 hover:shadow-inner transition-all duration-300">취소</button>
          </div>
        </div>
      </div>
    );
}

export default Mypage;
