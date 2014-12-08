<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Analytics extends MY_Controller {

	function __construct()
	{
            parent::__construct();
            $this->load->model('/api/Video_model');
	    $this->load->model('/api/Analytics_model');
	    $this->load->library('User_Agent');
	    $this->load->helper('common');
	     $this->load->config('messages');
	    $this->data['welcome'] = $this;
	    
	    //$this->load->library('User_Agent');//--regex class to get user agent --//
	    //-- get browser http_user_agent info in array --//
                    //$this->result = get_browser(null, true);
		    
		   $this->result = User_Agent::getinfo();  //--regex class to get user agent --//
		  
                //---------------------//
		
		$this->load->library('session');
		$s = $this->session->all_userdata();
		$this->user = $s[0]->username;
		$this->uid = $s[0]->id;
		$this->role_id = $s[0]->role_id;
	}
	
	function form()
	{
		$this->load->view('analytics-form');
	}
	
	function index()
	{
		//-- get geocoding google api --//
		$this->data['lat'] = $lat = $_GET['lat'];
		$this->data['long'] = $lng = $_GET['lng'];
		$url = "http://maps.googleapis.com/maps/api/geocode/json?latlng=".$lat.",".$lng."&sensor=true";
		$data = @file_get_contents($url);
		$result = json_decode($data,true);
		//echo '<pre>';print_r($result);die;
		$this->data['geodata'] = $result['results'][0]['address_components'];
		//------------------------------
		$this->load->helper('url');
                $id = $_GET['id'];
                $device = $_GET['device'];
                $this->data['result'] = $this->Video_model->video_play($id,$device);
                $this->data['user_id'] = $_GET['user_id'];
		//$this->data['scheduleBreaks'] = $this->Ads_model->getAdsScheduleBreaks();       
                $this->load->view('analytics',$this->data);
	}
        
        function addview()
        {
            $id = $_GET['id'];
            $this->Video_model->updateView($id);   
            echo 1;
        }
	
	function play()
	{
		$post = $_POST;                
		$post['browser'] = $this->result['browser'];
		$post['browser_version'] = $this->result['version'];
                $post['platform'] = $this->result['platform'];
               echo $this->Analytics_model->save($post);
	}
        
        function pause()
        {
            $post = $_POST;           
            $where = array('id'=>$post['id']);
           echo $this->Analytics_model->save($post,$where);
        }
        
        function complete()
        {
            $post = $_POST;           
            $where = array('id'=>$post['id']);
           echo $this->Analytics_model->save($post,$where);
        }
	
	function replay()
	{
		$post = $_POST;
		$post['browser'] = $this->result['browser'];
		$post['browser_version'] = $this->result['version'];
                $post['platform'] = $this->result['platform'];
		//$where = array('id'=>$post['id']);
		echo $this->Analytics_model->save($post);
	}
	
	function report()
	{
		$summary = $this->Analytics_model->getReport(array('type'=>'summary'));
		//echo '<pre>';print_r($summary);die;
		$this->data['summary'] = $summary[0];
		/* $url = "http://localhost:8085/solr/collection1/select?q=content_provider:".$this->uid."&wt=json&indent=true";
			$result = file_get_contents($url);
			$summary = json_decode($result);
		*/	
			//if($summary) {
			//  $this->data['summary'] = $summary->response->docs[0];            
		//}
	    
		$this->data['content'] = $this->Analytics_model->getReport(array('type'=>'content'));
		$this->data['useragent'] = $this->Analytics_model->getReport(array('type'=>'useragent'));
		$this->data['location'] = $this->Analytics_model->getReport(array('type'=>'location'));
		$this->data['map'] = $this->Analytics_model->getReport(array('type'=>'map'));
		$this->data['country'] = $this->Analytics_model->getReport(array('type'=>'country'));
		$this->data['content_provider'] = $this->Analytics_model->getReport(array('type'=>'content_provider'));
		$this->data['customer'] = $this->Analytics_model->getReport(array('type'=>'customer'));
		
		$this->show_view('report',$this->data);		
	}
	
	function ajax()
	{
		 $id = $_GET['user_id'];
		$result = $this->Analytics_model->getReport(array('id'=>$id,'type'=>'content'));
		echo json_encode($result);
	}
	
	
}

/* End of file welcome.php */
/* Location: ./system/application/controllers/welcome.php */