import { Component,ElementRef,ViewChild, OnInit } from '@angular/core';
import * as THREE from 'three';
@Component({
  selector: 'app-demo1',
  templateUrl: './demo1.component.html',
  styleUrls: ['./demo1.component.css']
})
export class Demo1Component  {
	@ViewChild('rendererContainer') rendererContainer: ElementRef;
    renderer = new THREE.WebGLRenderer();
    scene = null;
    camera = null;
    mesh = null;
	group= null;
	shape=null;
	items=[];
	expand=false;
	

    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
		/*PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )
			fov — Camera frustum vertical field of view.
			aspect — Camera frustum aspect ratio.
			near — Camera frustum near plane.
			far — Camera frustum far plane.
		*/
        this.camera.position.z = 1000;
		}
		
	/*Different shapes*/
	
	rectangel(w=500,h=200,d=100){
		const geometry = new THREE.BoxBufferGeometry(w,h,d);
		
		 const material = new THREE.MeshBasicMaterial( {color: 0xff0000 to 0xe6ffff } );
		 const react = new THREE.Mesh(geometry, material);
		 
		 this.geoArray(react);
		 // this.scene.add(this.mesh);
	}
	circularSector(){}
	
	annularSector(){}
	
	trapezoid(){}
	
	rightAngleTrapezoid(){}
	
	/*end of shapes*/
	shapeGeometry(){
		const width=500;
		const length=1000;
		/*Create new shape*/
			this.shape = new THREE.Shape();
			this.shape.moveTo( 0,0 );
			this.shape.lineTo( 0, width );
			this.shape.lineTo( length, width );
			this.shape.lineTo( length, 0 );
			this.shape.lineTo( 0, 0 );

		const extrudeSettings = {
			steps: 2,
			depth: 16,
			bevelEnabled: true,
			bevelThickness: 1,
			bevelSize: 1,
			bevelOffset: 0,
			bevelSegments: 1
		};

		var geometry = new THREE.ExtrudeGeometry( this.shape, extrudeSettings );
		var material = new THREE.MeshBasicMaterial( { color: 0x00ffff } );
		var extrudemesh = new THREE.Mesh( geometry, material ) ;
		this.gemetory(extrudemesh);
		// scene.add( mesh );
	}
	
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
	
    ngAfterViewInit() {
        this.renderer.setSize(900, 500);
        this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
        this.animate();
    }
	
	/*Clearing the scene*/
	clear(){
		while(this.scene.children.length > 0){ 
		this.scene.remove(this.scene.children[0]); 
	}
	}
    animate() {
        window.requestAnimationFrame(() => this.animate());
        // this.mesh.rotation.x += 0.01;
        // this.mesh.rotation.y += 0.02;
        this.renderer.render(this.scene, this.camera);
		
		document.addEventListener('mousedown', this.onDocumentMouseDown, false);
        document.addEventListener('mousedown', this.onDocumentMouseDown, false);
		document.addEventListener('mousemove', this.onDocumentMouseMove, false);
		document.addEventListener('mouseup', this.onDocumentMouseUp, false);

	
	
	}
}
