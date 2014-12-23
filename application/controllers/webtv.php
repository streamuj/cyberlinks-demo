<?php

class Webtv extends MY_Controller {

    public $uid = null;

    function __construct() {
        parent::__construct();
        $this->load->config('messages');
        $this->load->model('webtv_model');
        $s = $this->session->all_userdata();
        $this->uid = $s[0]->id;
    }

    function index() {
        if (isset($_POST['submit']) && $_POST['submit'] == 'Search') {
            $this->session->set_userdata('search_form', $_POST);
        } else if (isset($_POST['reset']) && $_POST['reset'] == 'Reset') {
            $this->session->unset_userdata('search_form');
        }
        $searchterm = $this->session->userdata('search_form');
        $data['welcome'] = $this;
        $this->load->library("pagination");
        $config["base_url"] = base_url() . "event/index/";
        $config["total_rows"] = $this->webtv_model->countAll($this->uid, $searchterm);
        $config["per_page"] = 100000;
        $config["uri_segment"] = 3;
        $this->pagination->initialize($config);
        $page = ($this->uri->segment(3)) ? $this->uri->segment(3) : 0;
        $data['res'] = $this->webtv_model->fetchplaylists($this->uid, PER_PAGE, $page, $searchterm);
        $data["links"] = $this->pagination->create_links();
        $this->show_view('webtv', $data);
    }
    
    function add(){
        $data['welcome'] = $this;
        if (isset($_POST['submit']) && $_POST['submit'] = 'Submit') {
            $post['name'] = $_POST['name'];
            $date = explode('-', $_POST['start_date']);
            $post['start_date'] = str_replace('/', '-', $date['0']);
            $post['end_date'] = str_replace('/', '-', $date['1']);
            $post['uid'] = $this->uid;
            $post['description'] = $_POST['description'];
            $post['status'] = $_POST['status'];
            $this->webtv_model->insert($post);
            $this->session->set_flashdata('message', $this->_successmsg($this->loadPo($this->config->item('success_record_add'))));
            redirect(base_url() . 'webtv');
        }
        $this->show_view('add_play', $data);
    }

    function delete(){
        $id = $_GET['id'];
        $this->webtv_model->delete($id);
        $this->session->set_flashdata('message', $this->_successmsg($this->loadPo($this->config->item('success_record_add'))));
        redirect(base_url() . 'webtv');
    }
    
    function edit() {
        $data['welcome'] = $this;
        $id = base64_decode($_GET['action']);
        if (isset($_POST['submit']) && $_POST['submit'] = 'Submit') {
            $post['id'] = $id;
            $post['name'] = $_POST['name'];
            $date = explode('-', $_POST['start_date']);
            $post['start_date'] = str_replace('/', '-', $date['0']);
            $post['end_date'] = str_replace('/', '-', $date['1']);
            $post['uid'] = $this->uid;
            $post['description'] = $_POST['description'];
            $post['status'] = $_POST['status'];
            $this->webtv_model->insert($post);
            $this->session->set_flashdata('message', $this->_successmsg($this->loadPo($this->config->item('success_record_update'))));
            redirect(base_url() . 'webtv');
        }
        $data['value'] = $this->webtv_model->fetchEventbyId($id);
        $this->show_view('add_play', $data);
    }
    function video_detail(){
        $data['welcome'] = $this;
        $id = $this->uri->segment(3);
        $data['package'] = $this->webtv_model->getPack($id);
        $data['result'] = $this->webtv_model->get_video($id);
        $this->show_view('playlist_video', $data);
    }
    
    function videoEpg(){
        $data['welcome'] = $this;
        $id = $this->uri->segment(3);
        $list = $this->webtv_model->getemgVideo($id);
        $ids = array('0'=>0);
        foreach ($list as $val){
            $ids[] = $val->id;
        }
        $data['playlist_id'] = $id;
        $data['package'] = $this->webtv_model->getPack($id);
        $data['result'] = $this->webtv_model->get_video($id, $ids);
        //echo "<pre>";        print_r($data['result']); die;
        $this->show_view('epg', $data);
    }
    
    function addVideo() {
        $searchterm='';
        if($this->uri->segment(2) ==''){                
            $this->session->unset_userdata('search_form');
        }
        $sort = $this->uri->segment(3); 
        $sort_by = $this->uri->segment(4);
        $data['welcome'] = $this;
        switch ($sort) {
            case "category":
                $sort = 'b.category';
                if ($sort_by == 'asc')
                    $data['show_c'] = 'desc';
                else
                    $data['show_c'] = 'asc';
                break;
            case "user":
                $sort = 'a.uid';
                if ($sort_by == 'asc')
                    $data['show_u'] = 'desc';
                else
                    $data['show_u'] = 'asc';
                break;
            case "status":
                $sort = 'a.status';
                if ($sort_by == 'asc')
                    $data['show_s'] = 'desc';
                else
                    $data['show_s'] = 'asc';
                break;
            case "created":
                $sort = 'a.created';
                if ($sort_by == 'asc')
                    $data['show_ca'] = 'desc';
                else
                    $data['show_ca'] = 'asc';
                break;
            case "title":
                $sort = 'a.title';
                if ($sort_by == 'asc')
                    $data['show_t'] = 'desc';
                else
                    $data['show_t'] = 'asc';
                break;
            default:
                $sort_by = 'desc';
                $sort = 'a.id';
        }
        if (isset($_POST['submit']) && $_POST['submit'] == 'Search') {
            $this->session->set_userdata('search_form', $_POST);
        } else if (isset($_POST['reset']) && $_POST['reset'] == 'Reset') {
            $this->session->unset_userdata('search_form');
        }
        $pid = $this->uri->segment(3);
        $list = $this->webtv_model->get_video($pid);
        $ids = array('0'=>0);
        foreach ($list as $val){
            $ids[] = $val->id;
        }
        $searchterm = $this->session->userdata('search_form');
        $this->load->library("pagination");
        $config = array();
        $config["base_url"] = base_url() . "webtv/addVideo/".$pid;
        $config["total_rows"] = $this->webtv_model->get_videocount($this->uid, $searchterm, $ids);
        $config["per_page"] = 10;
        $config["uri_segment"] = 4;
        $this->pagination->initialize($config);
        $page = ($this->uri->segment(4)) ? $this->uri->segment(4) : 0;
        $data['result'] = $this->webtv_model->get_allvideo($ids, $this->uid, PER_PAGE, $page, $sort, $sort_by, $searchterm);
        $data["links"] = $this->pagination->create_links();
        $data['category'] = $this->webtv_model->get_category($this->uid);
        $data['total_rows'] = $config["total_rows"];
        $this->show_view('video_playlist', $data);
    }
    
    function VideoPack(){
        $pid = $this->uri->segment(3);
        $cid = $this->uri->segment(4);                               
        $this->webtv_model->add_video($pid, $cid);
        echo json_encode(array('success'=>TRUE,'message'=>"Article added"));
    }
    function unlink(){
        $id = $this->uri->segment(3);
        $this->webtv_model->delete_vid($id);
        echo json_encode(array('success'=>TRUE,'message'=>"Article deleted"));
    }
    
    function renderevent(){
        $data = array();
        $query = sprintf('select * from playlist_epg pe
                         left join playlist_video pv on pv.content_id = pe.content_id
                         where pe.user_id = %d and pe.start_date between "%s" and "%s" ',$this->uid,date('Y-m-d h:i:s',$_GET['start']),date('Y-m-d h:i:s',$_GET['end']));
        $dataset = $this->db->query($query)->result();
        foreach($dataset as $key=>$val){
            $data[] = array('id'=>$val->content_id,
                            'title'=>$val->playlist_id,
                            'title'=>$val->title,
                            'start'=> $val->start_date,
                            'end'=> $val->end_date,
                            'backgroundColor'=> $val->color,
                            'borderColor'=>'',
                            'allDay'=>false,
                            'axisFormat'=>'HH:mm');
        }
        echo json_encode($data);    
        exit;
    }
    
    function saveevent(){
        $response = array();
        if(isset($_POST['id'])){
            
            $data = array();
            $data['content_id'] = $_POST['id'];
            $data['playlist_id'] = $_POST['playlist_id'];
            $data['title'] = $_POST['title'];
            $data['user_id'] = $this->uid;
            $data['start_date'] = isset($_POST['start_date']) && $_POST['start_date']!='' ? date('Y-m-d h:i:s',strtotime($_POST['start_date'])) : date('Y-m-d h:i:s');
            $data['end_date'] = isset($_POST['end_date']) && $_POST['end_date']!='' ? date('Y-m-d h:i:s',strtotime($_POST['end_date'])) : date('Y-m-d h:i:s',strtotime($data['start_date']) + 60*60);
            
            $query = sprintf('select * from playlist_epg pe where pe.content_id = %d and user_id = %d',$_POST['id'],$this->uid);
            $dataset = $this->db->query($query)->result();
            if(count($dataset) > 0){
                $this->db->where('id', $dataset[0]->id);
                $this->db->update('playlist_epg',$data);
            }else{
                $data['created'] = date('Y-m-d h:i:s');
                $this->db->insert('playlist_epg',$data);
            }
            $response['success'] = 'Data saved';
            
        }else{
            $response['error'] = 'Invalid Data';
        }
        echo json_encode($response);
        exit;
    }
}
