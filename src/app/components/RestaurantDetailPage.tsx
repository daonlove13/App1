import { ChevronLeft, MapPin, Users, Clock, Phone } from 'lucide-react';

export interface Restaurant {
  id: number;
  name: string;
  location: string;
  district: string;
  teamCount: number;
  seats: number;
}

export default function RestaurantDetailPage({
  restaurant,
  onBack,
  onApply,
}: {
  restaurant: Restaurant;
  onBack: () => void;
  onApply?: () => void;
}) {
  return (
    <div className="bg-white overflow-clip relative rounded-[40px] w-[390px] h-[844px]">

      {/* Header */}
      <div className="absolute top-[0px] left-0 right-0 bg-white z-10 px-4 py-4 flex items-center gap-2 border-b border-[#f3f4f6]">
        <button onClick={onBack} className="p-1"><ChevronLeft size={24} /></button>
        <span className="font-bold text-[16px]">식당 상세</span>
      </div>

      {/* Content */}
      <div className="absolute top-[66px] left-0 right-0 bottom-0 overflow-y-auto">
        <div className="h-[220px] bg-[#f3f4f6] flex items-center justify-center">
          <span className="text-[#d1d5dc] text-[12px]">사진 준비 중</span>
        </div>

        <div className="px-4 pt-5">
          <h1 className="font-bold text-[22px] mb-1">{restaurant.name}</h1>
          <p className="text-[13px] text-[#6a7282] mb-5">
            {restaurant.location} · {restaurant.district}
          </p>

          <div className="bg-black text-white rounded-[16px] p-5 mb-5">
            <div className="flex items-center gap-2 mb-2">
              <Users size={16} className="text-white/70" />
              <span className="text-[13px] text-white/70">현재 매칭 대기 팀</span>
            </div>
            <div className="font-bold text-[28px]">{restaurant.teamCount}팀</div>
            <p className="text-[12px] text-white/60 mt-1">총 좌석 {restaurant.seats}석</p>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-[#6a7282] mt-0.5" />
              <div>
                <p className="text-[12px] text-[#6a7282]">위치</p>
                <p className="text-[14px]">{restaurant.location} {restaurant.district} 학교 앞 도보 5분</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock size={18} className="text-[#6a7282] mt-0.5" />
              <div>
                <p className="text-[12px] text-[#6a7282]">영업시간</p>
                <p className="text-[14px]">매일 17:00 ~ 02:00</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone size={18} className="text-[#6a7282] mt-0.5" />
              <div>
                <p className="text-[12px] text-[#6a7282]">전화</p>
                <p className="text-[14px]">02-000-0000</p>
              </div>
            </div>
          </div>

          <button
            onClick={onApply}
            className="w-full bg-black text-white py-[14px] rounded-full text-[14px] font-semibold mb-6 active:bg-gray-800"
          >
            이 식당으로 매칭 신청
          </button>
        </div>
      </div>
    </div>
  );
}