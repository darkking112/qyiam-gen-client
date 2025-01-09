import React from "react";
import "./filledSheetDialog.css";
function FilledSheetDialog({ sheet, onClose }) {
  return (
    <div className="sheet-dialog-overlay" onClick={onClose}>
      <div className="sheet-dialog">
        <h3 className="sheet-date">{`${sheet.date}`}</h3>

        <table>
          <thead>
            <tr>
              <th>{"رقم البند"}</th>
              <th>{"البند"}</th>
              <th>{"الدرجة"}</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>{"1"}</td>
              <td>{"المحافظة على الصلاة في وقتها"}</td>
              <td>{`${sheet.prayerOnTime}`}</td>
            </tr>
            <tr>
              <td>{"2"}</td>
              <td>{"المحافظة على نوافل الصلوات"}</td>
              <td>{`${sheet.voluntaryPrayers}`}</td>
            </tr>
            <tr>
              <td>{"3"}</td>
              <td>{"المحافظة على اذكار الصباح"}</td>
              <td>{`${sheet.morningSupplications}`}</td>
            </tr>
            <tr>
              <td>{"4"}</td>
              <td>{"المحافظة على اذكار المساء"}</td>
              <td>{`${sheet.eveningSupplications}`}</td>
            </tr>
            <tr>
              <td>{"5"}</td>
              <td>{"قراءة الورد اليومي من القرآن"}</td>
              <td>{`${sheet.quranDailyPortion}`}</td>
            </tr>
            <tr>
              <td>{"6"}</td>
              <td>{"سماع كلام الوالدين"}</td>
              <td>{`${sheet.listeningToParents}`}</td>
            </tr>
            <tr>
              <td>{"7"}</td>
              <td>{"ترتيب الغرفة الشخصية"}</td>
              <td>{`${sheet.organizingPersonalBelongings}`}</td>
            </tr>
            <tr>
              <td>{"8"}</td>
              <td>{"المحافظة على السواك"}</td>
              <td>{`${sheet.siwak}`}</td>
            </tr>
            <tr>
              <td>{"9"}</td>
              <td>{"المساعدة في أعمال البيت"}</td>
              <td>{`${sheet.helpingInHouse}`}</td>
            </tr>
            <tr>
              <td>{"10"}</td>
              <td>{"النوم مبكراً"}</td>
              <td>{`${sheet.sleepingEarly}`}</td>
            </tr>
            <tr>
              <td>{"11"}</td>
              <td>{"مذاكرة الدروس"}</td>
              <td>{`${sheet.lessonsReviewing}`}</td>
            </tr>
            <tr>
              <td>{"12"}</td>
              <td>{"قراءة سورة الكهف"}</td>
              <td>{`${sheet.readingSurahAlKahaf}`}</td>
            </tr>
            <tr>
              <td>{"13"}</td>
              <td>{"التبكير لصلاة الجمعة"}</td>
              <td>{`${sheet.attendingFridayEarly}`}</td>
            </tr>
            <tr>
              <td>{"14"}</td>
              <td>{"التواصل مع الارحام"}</td>
              <td>{`${sheet.connectingWithRelatives}`}</td>
            </tr>
            <tr>
              <td>{"15"}</td>
              <td>{"المحافظة على الرياضة"}</td>
              <td>{`${sheet.dailyExercise}`}</td>
            </tr>
            <tr>
              <td>{"16"}</td>
              <td>{"المحافظة على الأكل الصحي"}</td>
              <td>{`${sheet.healthyFood}`}</td>
            </tr>
          </tbody>
        </table>

        <button className="close-button" onClick={onClose}>
          {"إغلاق"}
        </button>
      </div>
    </div>
  );
}

export default FilledSheetDialog;
