import { Component,ElementRef,ViewChild, OnInit } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-venue-modeling',
  templateUrl: './venue-modeling.component.html',
  styleUrls: ['./venue-modeling.component.css']
})
export class VenueModelingComponent {

 @ViewChild('rendererContainer') rendererContainer: ElementRef;

    scene=null;
	camera=null;
	material=null;
	boxMesh=null;
	surfaceMaterial=null;
    constructor() {
        //camera
		this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
		/*PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )
			fov — Camera frustum vertical field of view.
			aspect — Camera frustum aspect ratio.
			near — Camera frustum near plane.
			far — Camera frustum far plane.
		*/
		this.camera.position.set(20,40,50);
		//scene
		this.scene = new THREE.Scene();
		this.renderer=new THREE.WebGLRenderer();
		//light
		const light=new THREE.AmbientLight(0xffffff,0.5);
		this.scene.add(light);
		const light2=new THREE.PointLight(0xffffff,0.5);
		this.scene.add(light2);
		//material
        this.surfaceMaterial=new THREE.MeshBasicMaterial( {color: 0xffffff,wireframe:true} );
		this.material = new THREE.MeshPhongMaterial( {color: 0xff0000 to 0xe6ffff } );
		this.boxGeo();
		this.spearGeo();
		this.planeGeo();
		}
	
	
	boxGeo(w=500,h=200,d=100){
		const geometry=new THREE.BoxGeometry(w,h,d);
		this.boxMesh = new THREE.Mesh(geometry,this.material);
		this.boxMesh.position.z = -1000;
		this.boxMesh.position.x = -100;
		this.scene.add(this.boxMesh);
	}
	spearGeo(){
		const geometry=new THREE.SphereGeometry(50,20,20);
		const sphereMesh=new THREE.Mesh(geometry,this.material);
		sphereMesh.position.z = -400;
		sphereMesh.position.y = 100;
		this.scene.add(sphereMesh);
	}
	planeGeo(){
		
		const geometry=new THREE.PlaneGeometry(10000,10000,100,100);
		const planeMesh=new THREE.Mesh(geometry,this.surfaceMaterial);
		planeMesh.rotation.x= -90*Math.PI/180;
		planeMesh.position.y= -100;
		this.scene.add(planeMesh);
		
	}
	/*toDO*/
	circularSector(){}
	
	annularSector(){}
	
	trapezoid(){}
	
	rightAngleTrapezoid(){}
	
	ngAfterViewInit() {
		
        this.renderer.setSize(900, 500);
		this.renderer.setClearColor(0x000000);
        this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
		this.renderer.render(this.scene,this.camera);
    }
	
	/*Grouping into a scene*/
	geoArray(shapes)
	{
			this.items.push(shapes);
			console.log(this.items);
			this.groupby(this.items);
	}
	
	//create a group of shapes/items
	groupby(objs){
		this.group = new THREE.Group();
		for(let i=0;i<objs.length;i++){
		this.group.add( objs[i] );
		}
		this.scene.add( this.group );
	}
	
	/*Clearing the scene*/
	clear(){
		while(this.scene.children.length > 0){ 
		this.scene.remove(this.scene.children[0]); 
	}
	}
}
