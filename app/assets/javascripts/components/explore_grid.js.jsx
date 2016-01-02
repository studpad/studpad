var Masonry = require('react-masonry-component')(React);

var masonryOptions = {
    transitionDuration: 0
};



// <figure key={i} style={{width: 200, margin: '10px'}}>
//                   <div className="autor-explore border-radius-top">
//                       <div className="avatar" style={{background: 'url(https://pp.vk.me/c622925/v622925106/2f6f6/Q4Ds1TD42kM.jpg) no-repeat', backgroundSize: 'cover'}}>
//                       </div>
//                       <div className="info">
//                         <div className='name'>
//                           <a href="/users/2">Никитина Елена Сергеевна</a>
//                         </div>
//                         <div className='follow'>
//                           Читать
//                         </div>
//                       </div>
//                   </div>
//                   <img src={element}/>
//                 </figure>

var Gallery = React.createClass({
    render: function () {
        var childElements = this.props.elements.map(function(element, i){
           return (
        <figure key={i}>
          <div className="autor-explore border-radius-top">
              <div className="avatar" style={{background: 'url(https://pp.vk.me/c622925/v622925106/2f6f6/Q4Ds1TD42kM.jpg) no-repeat', backgroundSize: 'cover'}}>
              </div>
              <div className="info">
                <div className='name'>
                  <a href="/users/2">Никитина Елена Сергеевна</a>
                </div>
                <div className='follow'>
                  Читать
                </div>
              </div>
          </div>
          <img src={element}/>
          <figcaption className='content-board border-b-radius'>
            <p className='link'><img src="/images/link.png"/> <a>studpad.ru</a></p>
            <h3 className='title'>А почему бы не бухнуть?</h3>
            <p className='text'>Kale chips lomo biodiesel stumptown Godard Tumblr, mustache sriracha tattooed cray aute slow-carb placeat delectus. Letterpress asymmetrical fanny pack art party est pour-over skateboard anim quis, ullamco craft beer.</p>
            <p className='tags-sp'><span>#studpad</span> <span>#йога</span> <span>#друг</span></p>

            <footer>
              <div className='delicious-like'>
                <div>
                  Просмотреть
                </div>
                <div>
                  <span>
                    <img ref='delicious_tooltip' title='Сохранить себе' data-toggle="tooltip" data-placement="top" src='images/delicious.png' />
                    <span>
                      5
                    </span>
                  </span>
                  <span>
                    <img ref='delicious_tooltip' title='Сохранить себе' data-toggle="tooltip" data-placement="top" src='images/like.png' />
                    <span>
                      5
                    </span>
                  </span>
                </div>
              </div>
            </footer>
            <div className='clearboth'>
            </div>
          </figcaption>
        </figure>
        );
        });

        return (
            <Masonry
                className={'grid-wrap'}
                elementType={'div'}
                options={masonryOptions}
                disableImagesLoaded={false}
            >
                {childElements}
            </Masonry>
        );
    }
});

module.exports = Gallery;
