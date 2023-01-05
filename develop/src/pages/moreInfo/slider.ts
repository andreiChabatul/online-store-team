import CreateElement from '../../utils/CreateElement';
import { IProduct, IRenderComponent } from '../../types/index';
import './ slider.css';


export default class Slider implements IRenderComponent {
  obj: IProduct;
  constructor(obj: IProduct) {
    this.obj = obj;
  }

  render(): HTMLDivElement {
    let a: string = '0';
    const prodactPhotos = CreateElement.createDivElement('moreinfo-prodact-photos');
    const grandPhoto = CreateElement.createDivElement('moreinfo-grand-foto');
    const slides = CreateElement.createDivElement('moreinfo-slides');
    const productImgGrand = CreateElement.createImgElement('moreinfo-product-img-grand', `${this.obj.images[0]}`, '');
    prodactPhotos.append(grandPhoto);
    prodactPhotos.append(slides);
    this.obj.images.forEach((element: string, index: number) => {
      let productImgSLide1 = CreateElement.createImgElement('moreinfo-product-img-slide', `${element}`, `${index}`);
      if (productImgSLide1.id === a) {
        productImgSLide1.classList.add('moreinfo-active-slide');
      }
      productImgSLide1.addEventListener("click", function showConsole(e) {
        if (productImgSLide1.id !== a) {
          let activeSlide = document.getElementById(`${a}`) as HTMLImageElement;
          a = productImgSLide1.id;
          productImgGrand.src = productImgSLide1.src
          console.log(activeSlide)
          productImgSLide1.classList.add('moreinfo-active-slide');
          activeSlide.classList.remove('moreinfo-active-slide');
        }
      })
      slides.append(productImgSLide1);
    });
    grandPhoto.append(productImgGrand);
    return prodactPhotos;
  }
}