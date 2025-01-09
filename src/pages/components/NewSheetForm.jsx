import React, { useState } from "react";

const NewSheetForm = ({ student, onClose, onSubmit, insertedBy }) => {
  const [formData, setFormData] = useState({
    studentID: student.studentID,
    prayerOnTime: 0,
    voluntaryPrayers: 0,
    morningSupplications: 0,
    eveningSupplications: 0,
    quranDailyPortion: 0,
    listeningToParents: 0,
    organizingPersonalBelongings: 0,
    siwak: 0,
    helpingInHouse: 0,
    sleepingEarly: 0,
    lessonsReviewing: 0,
    readingSurahAlKahaf: 0,
    attendingFridayEarly: 0,
    connectingWithRelatives: 0,
    dailyExercise: 0,
    healthyFood: 0,
    insertedBy: insertedBy,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog new-sheet-dialog">
        <h3>{`الطالب: ${student.name}`}</h3>
        <h4>{"السجل اليومي"}</h4>
        <form onSubmit={handleSubmit}>
          <div>
            <label>{"المحافظة على الصلاة في وقتها"}</label>
            <input
              type="range"
              name="prayerOnTime"
              min="0"
              max="10"
              value={formData.prayerOnTime}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>{"المحافظة على نوافل الصلوات"}</label>
            <input
              type="range"
              name="voluntaryPrayers"
              min="0"
              max="10"
              value={formData.voluntaryPrayers}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>{"المحافظة على أذكار الصباح"}</label>
            <input
              type="range"
              name="morningSupplications"
              min="0"
              max="10"
              value={formData.morningSupplications}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>{"المحافظة على أذكار المساء"}</label>
            <input
              type="range"
              name="eveningSupplications"
              min="0"
              max="10"
              value={formData.eveningSupplications}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>{"قراءة الورد اليومي من القرآن"}</label>
            <input
              type="range"
              name="quranDailyPortion"
              min="0"
              max="10"
              value={formData.quranDailyPortion}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>{"سماع كلام الوالدين"}</label>
            <input
              type="range"
              name="listeningToParents"
              min="0"
              max="10"
              value={formData.listeningToParents}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>{"ترتيب الغرفة الشحصية"}</label>
            <input
              type="range"
              name="organizingPersonalBelongings"
              min="0"
              max="10"
              value={formData.organizingPersonalBelongings}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>{"المحافظة على السواك"}</label>
            <input
              type="range"
              name="siwak"
              min="0"
              max="10"
              value={formData.siwak}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>{"المساعدة في أعمال البيت"}</label>
            <input
              type="range"
              name="helpingInHouse"
              min="0"
              max="10"
              value={formData.helpingInHouse}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>{"النوم المبكر"}</label>
            <input
              type="range"
              name="sleepingEarly"
              min="0"
              max="10"
              value={formData.sleepingEarly}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>{"مذاكرة ومراجعة الدروس"}</label>
            <input
              type="range"
              name="lessonsReviewing"
              min="0"
              max="10"
              value={formData.lessonsReviewing}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>{"قراءة سورة الكهف"}</label>
            <input
              type="range"
              name="readingSurahAlKahaf"
              min="0"
              max="10"
              value={formData.readingSurahAlKahaf}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>{"التبكير لصلاة الجمعة"}</label>
            <input
              type="range"
              name="attendingFridayEarly"
              min="0"
              max="10"
              value={formData.attendingFridayEarly}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>{"التواصل مع الأرحام"}</label>
            <input
              type="range"
              name="connectingWithRelatives"
              min="0"
              max="10"
              value={formData.connectingWithRelatives}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>{"المحافظة على الرياضة"}</label>
            <input
              type="range"
              name="dailyExercise"
              min="0"
              max="10"
              value={formData.dailyExercise}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>{"المحافظة على الأكل الصحي"}</label>
            <input
              type="range"
              name="healthyFood"
              min="0"
              max="10"
              value={formData.healthyFood}
              onChange={handleChange}
            />
          </div>
          <div className="btns">
            <button type="button" onClick={onClose}>
              {"إلغاء"}
            </button>
            <button type="submit">{"إضافة"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewSheetForm;
