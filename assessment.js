'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area')
const tweetDivided = document.getElementById('tweet-area')

/**
 * 指定した要素の子どもを全て削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
    //すでにある診断結果を削除
    while (element.firstChild) { //result-areaに、何かタグがある限りループする
        element.removeChild(element.firstChild);
    }
}
//入力欄でエンターキーを押したときに診断を実行
userNameInput.onkeydown = function (event){
    if (event.key === 'Enter'){
        assessmentButton.onclick();
    }
}

assessmentButton.onclick = function () {
    const userName = userNameInput.value;
    if (userName.length === 0) {    //!userName でもいける　
        // 名前が空の時は処理を終了する
        return;
    }



    //TODO　診断結果表示エリアの作成　
    removeAllChildren(resultDivided);
 
    //result-areaにｈ３タグで診断結果という文字を表示
    const header = document.createElement('h3') //ｈ３タグをつくり
    header.innerText = '診断結果';  //h3タグに診断結果の文字を設定
    resultDivided.appendChild(header);  //HTMLのresult-areaにheader変数を設定

    //診断処理を実行
    //Pタグで診断結果を表示
    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    //TODO　ツイートエリアの作成
    removeAllChildren(tweetDivided);    //tweetエリアの初期化
    //Aタグを作って属性を設定
 
    const anchor = document.createElement('a') ;
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=' 
    + encodeURIComponent('あなたのいいところ') +
    '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href',hrefValue);
    anchor.className = 'twitter-hashtag-button';    //anchor.setAttribute('class','twitter-hashtag-button')とおなじ 
    anchor.setAttribute('data-text',result);
    anchor.innerText = 'Tweet #あなたのいいところ';
    //AタグをHTMLとして追加する
    tweetDivided.appendChild(anchor);

    //scriptタグをつくる
    const script = document.createElement('script');
    script.setAttribute('src','https://platform.twitter.com/widgets.js');
    //scriptタグをHTMLとして追加する
    tweetDivided.appendChild(script);

};
const answers = [
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
];
/**
 * 名前の文字列を渡すと診断結果をかえす関数
 * @param {string} userName ユーザーの名前
 * @return{string} 診断結果
 */
function assessment(userName) {
    //　userName (文字列)を数値に変換
    //すべての文字を足し算する
    var userNameNumber = 0;
    for (let i = 0; i < userName.length; i++) {
        userNameNumber += userName.charCodeAt(i);
    }

    //回答結果の範囲に変換（0-15）
    var answerNumber = userNameNumber % answers.length;
    var result = answers[answerNumber];
    return result.replace(/\{userName\}/g, userName)//置換

}

//console.log(assessment('太郎'));
//console.log(assessment('香織'));

console.assert(
    assessment('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
)

console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
);